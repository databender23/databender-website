import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  QueryCommandInput,
  UpdateCommand,
  UpdateCommandInput,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";
import type { Lead, LeadNote, ContactRecord, LeadQueryParams, LeadQueryResult } from "./types";

const LEADS_TABLE = "databender-leads";
const REGION = process.env.DYNAMODB_REGION || "us-east-1";

function getClient(): DynamoDBDocumentClient {
  const client = new DynamoDBClient({ region: REGION });
  return DynamoDBDocumentClient.from(client);
}

/**
 * Store a new lead in DynamoDB
 */
export async function putLead(lead: Lead): Promise<void> {
  const client = getClient();

  await client.send(
    new PutCommand({
      TableName: LEADS_TABLE,
      Item: lead,
    })
  );
}

/**
 * Get a lead by leadId (requires scan with filter)
 */
export async function getLead(leadId: string): Promise<Lead | null> {
  const client = getClient();

  const result = await client.send(
    new ScanCommand({
      TableName: LEADS_TABLE,
      FilterExpression: "leadId = :leadId",
      ExpressionAttributeValues: {
        ":leadId": leadId,
      },
      Limit: 1,
    })
  );

  if (result.Items && result.Items.length > 0) {
    return result.Items[0] as Lead;
  }

  return null;
}

/**
 * Get the latest lead for an email address
 */
export async function getLeadByEmail(email: string): Promise<Lead | null> {
  const client = getClient();
  const pk = `LEAD#${email.toLowerCase()}`;

  const result = await client.send(
    new QueryCommand({
      TableName: LEADS_TABLE,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": pk,
      },
      ScanIndexForward: false, // Sort descending to get latest first
      Limit: 1,
    })
  );

  if (result.Items && result.Items.length > 0) {
    return result.Items[0] as Lead;
  }

  return null;
}

/**
 * Query leads by status using GSI
 */
export async function queryLeadsByStatus(
  status: string,
  limit: number = 50,
  lastKey?: string
): Promise<LeadQueryResult> {
  const client = getClient();

  const params: QueryCommandInput = {
    TableName: LEADS_TABLE,
    IndexName: "status-createdAt-index",
    KeyConditionExpression: "#status = :status",
    ExpressionAttributeNames: {
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":status": status,
    },
    ScanIndexForward: false, // Most recent first
    Limit: limit,
  };

  if (lastKey) {
    params.ExclusiveStartKey = JSON.parse(lastKey);
  }

  const result = await client.send(new QueryCommand(params));

  return {
    leads: (result.Items || []) as Lead[],
    totalCount: result.Count || 0,
    lastKey: result.LastEvaluatedKey
      ? JSON.stringify(result.LastEvaluatedKey)
      : undefined,
  };
}

/**
 * Query leads by industry using GSI
 */
export async function queryLeadsByIndustry(
  industry: string,
  limit: number = 50
): Promise<LeadQueryResult> {
  const client = getClient();

  const result = await client.send(
    new QueryCommand({
      TableName: LEADS_TABLE,
      IndexName: "industry-createdAt-index",
      KeyConditionExpression: "industry = :industry",
      ExpressionAttributeValues: {
        ":industry": industry,
      },
      ScanIndexForward: false,
      Limit: limit,
    })
  );

  return {
    leads: (result.Items || []) as Lead[],
    totalCount: result.Count || 0,
    lastKey: result.LastEvaluatedKey
      ? JSON.stringify(result.LastEvaluatedKey)
      : undefined,
  };
}

/**
 * Query leads by visitorId using GSI
 */
export async function queryLeadsByVisitorId(visitorId: string): Promise<Lead[]> {
  const client = getClient();

  const result = await client.send(
    new QueryCommand({
      TableName: LEADS_TABLE,
      IndexName: "visitorId-createdAt-index",
      KeyConditionExpression: "visitorId = :visitorId",
      ExpressionAttributeValues: {
        ":visitorId": visitorId,
      },
      ScanIndexForward: false,
    })
  );

  return (result.Items || []) as Lead[];
}

/**
 * General scan/query for leads with filtering
 */
export async function scanLeads(params: LeadQueryParams): Promise<LeadQueryResult> {
  const client = getClient();
  const {
    status,
    tier,
    industry,
    formType,
    startDate,
    endDate,
    minScore,
    search,
    limit = 50,
    lastKey,
    sortOrder = "desc",
  } = params;

  // Build filter expressions
  const filterExpressions: string[] = [];
  const expressionAttributeValues: Record<string, unknown> = {};
  const expressionAttributeNames: Record<string, string> = {};

  if (status) {
    filterExpressions.push("#status = :status");
    expressionAttributeNames["#status"] = "status";
    expressionAttributeValues[":status"] = status;
  }

  if (tier) {
    filterExpressions.push("tier = :tier");
    expressionAttributeValues[":tier"] = tier;
  }

  if (industry) {
    filterExpressions.push("industry = :industry");
    expressionAttributeValues[":industry"] = industry;
  }

  if (formType) {
    filterExpressions.push("formType = :formType");
    expressionAttributeValues[":formType"] = formType;
  }

  if (startDate) {
    filterExpressions.push("createdAt >= :startDate");
    expressionAttributeValues[":startDate"] = startDate;
  }

  if (endDate) {
    filterExpressions.push("createdAt <= :endDate");
    expressionAttributeValues[":endDate"] = endDate;
  }

  if (minScore !== undefined) {
    filterExpressions.push("behaviorScore >= :minScore");
    expressionAttributeValues[":minScore"] = minScore;
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filterExpressions.push(
      "(contains(#email, :search) OR contains(firstName, :search) OR contains(lastName, :search) OR contains(company, :search))"
    );
    expressionAttributeNames["#email"] = "email";
    expressionAttributeValues[":search"] = searchLower;
  }

  const scanParams: ScanCommandInput = {
    TableName: LEADS_TABLE,
    Limit: limit,
  };

  if (filterExpressions.length > 0) {
    scanParams.FilterExpression = filterExpressions.join(" AND ");
    scanParams.ExpressionAttributeValues = expressionAttributeValues;
  }

  if (Object.keys(expressionAttributeNames).length > 0) {
    scanParams.ExpressionAttributeNames = expressionAttributeNames;
  }

  if (lastKey) {
    scanParams.ExclusiveStartKey = JSON.parse(lastKey);
  }

  const result = await client.send(new ScanCommand(scanParams));

  const leads = (result.Items || []) as Lead[];

  // Sort results (scan doesn't guarantee order)
  leads.sort((a, b) => {
    const aDate = new Date(a.createdAt).getTime();
    const bDate = new Date(b.createdAt).getTime();
    return sortOrder === "desc" ? bDate - aDate : aDate - bDate;
  });

  return {
    leads,
    totalCount: result.Count || 0,
    lastKey: result.LastEvaluatedKey
      ? JSON.stringify(result.LastEvaluatedKey)
      : undefined,
  };
}

/**
 * Update an existing lead
 */
export async function updateLead(
  email: string,
  createdAt: string,
  updates: Partial<Lead>
): Promise<void> {
  const client = getClient();
  const pk = `LEAD#${email.toLowerCase()}`;
  const sk = `#CREATED#${createdAt}`;

  // Build update expression dynamically
  const updateExpressions: string[] = [];
  const expressionAttributeValues: Record<string, unknown> = {};
  const expressionAttributeNames: Record<string, string> = {};

  // Always update updatedAt timestamp
  updates.updatedAt = new Date().toISOString();

  // Reserved words in DynamoDB that need attribute name mapping
  const reservedWords = ["status", "email", "name"];

  for (const [key, value] of Object.entries(updates)) {
    if (key === "pk" || key === "sk") continue; // Skip primary keys

    const attrName = reservedWords.includes(key) ? `#${key}` : key;
    const attrValue = `:${key}`;

    if (reservedWords.includes(key)) {
      expressionAttributeNames[attrName] = key;
    }

    updateExpressions.push(`${attrName} = ${attrValue}`);
    expressionAttributeValues[attrValue] = value;
  }

  if (updateExpressions.length === 0) return;

  const params: UpdateCommandInput = {
    TableName: LEADS_TABLE,
    Key: { pk, sk },
    UpdateExpression: `SET ${updateExpressions.join(", ")}`,
    ExpressionAttributeValues: expressionAttributeValues,
  };

  if (Object.keys(expressionAttributeNames).length > 0) {
    params.ExpressionAttributeNames = expressionAttributeNames;
  }

  await client.send(new UpdateCommand(params));
}

/**
 * Add a note to an existing lead
 */
export async function addLeadNote(
  email: string,
  createdAt: string,
  note: LeadNote
): Promise<void> {
  const client = getClient();
  const pk = `LEAD#${email.toLowerCase()}`;
  const sk = `#CREATED#${createdAt}`;

  await client.send(
    new UpdateCommand({
      TableName: LEADS_TABLE,
      Key: { pk, sk },
      UpdateExpression:
        "SET notes = list_append(if_not_exists(notes, :emptyList), :note), updatedAt = :updatedAt",
      ExpressionAttributeValues: {
        ":note": [note],
        ":emptyList": [],
        ":updatedAt": new Date().toISOString(),
      },
    })
  );
}

/**
 * Add a contact record to an existing lead's contact history
 */
export async function addContactRecord(
  email: string,
  createdAt: string,
  record: ContactRecord
): Promise<void> {
  const client = getClient();
  const pk = `LEAD#${email.toLowerCase()}`;
  const sk = `#CREATED#${createdAt}`;

  await client.send(
    new UpdateCommand({
      TableName: LEADS_TABLE,
      Key: { pk, sk },
      UpdateExpression:
        "SET contactHistory = list_append(if_not_exists(contactHistory, :emptyList), :record), updatedAt = :updatedAt",
      ExpressionAttributeValues: {
        ":record": [record],
        ":emptyList": [],
        ":updatedAt": new Date().toISOString(),
      },
    })
  );
}

/**
 * Scan for leads with active email sequences
 * Used by the sequence processor to find leads that need emails sent
 */
export async function scanLeadsWithActiveSequences(): Promise<Lead[]> {
  const client = getClient();
  const allLeads: Lead[] = [];
  let lastEvaluatedKey: Record<string, unknown> | undefined;

  do {
    const params: ScanCommandInput = {
      TableName: LEADS_TABLE,
      FilterExpression: "emailSequence.#status = :active",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":active": "active",
      },
    };

    if (lastEvaluatedKey) {
      params.ExclusiveStartKey = lastEvaluatedKey;
    }

    const result = await client.send(new ScanCommand(params));

    if (result.Items) {
      allLeads.push(...(result.Items as Lead[]));
    }

    lastEvaluatedKey = result.LastEvaluatedKey as Record<string, unknown> | undefined;
  } while (lastEvaluatedKey);

  return allLeads;
}
