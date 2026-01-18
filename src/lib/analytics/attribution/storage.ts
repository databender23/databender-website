/**
 * DynamoDB Storage for W-Shaped Attribution
 *
 * Uses existing DynamoDB patterns with dedicated touchpoint storage:
 * - PK: TOUCHPOINT#visitorId
 * - SK: timestamp#touchpointId
 *
 * Tables:
 * - databender-analytics-touchpoints: Touchpoint storage
 * - databender-analytics-opportunities: Opportunity tracking
 * - databender-analytics-self-reported: Self-reported attribution
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import type {
  Touchpoint,
  StoredTouchpoint,
  Opportunity,
  StoredOpportunity,
  SelfReportedSource,
  StoredSelfReportedSource,
  AttributionResult,
} from "./types";

// Table names (using same naming convention as existing analytics)
const TOUCHPOINTS_TABLE = "databender-analytics-touchpoints";
const OPPORTUNITIES_TABLE = "databender-analytics-opportunities";
const SELF_REPORTED_TABLE = "databender-analytics-self-reported";

const REGION = process.env.DYNAMODB_REGION || "us-east-1";
const TTL_DAYS = 180; // 6 months for attribution data (longer than session data)

function getClient(): DynamoDBDocumentClient {
  const client = new DynamoDBClient({ region: REGION });
  return DynamoDBDocumentClient.from(client);
}

function getTTL(): number {
  return Math.floor(Date.now() / 1000) + TTL_DAYS * 24 * 60 * 60;
}

function getDateString(date: Date = new Date()): string {
  return date.toISOString().split("T")[0];
}

// ============================================
// Touchpoint Storage
// ============================================

/**
 * Store a touchpoint in DynamoDB
 * PK: TOUCHPOINT#visitorId
 * SK: timestamp#touchpointId (for chronological ordering)
 */
export async function storeTouchpointToDB(touchpoint: Touchpoint): Promise<void> {
  const client = getClient();
  const timestamp = touchpoint.timestamp.toISOString();

  const item: StoredTouchpoint & { pk: string; sk: string; dateIndex: string } = {
    pk: `TOUCHPOINT#${touchpoint.visitorId}`,
    sk: `${timestamp}#${touchpoint.id}`,
    dateIndex: getDateString(touchpoint.timestamp), // For GSI date-range queries
    id: touchpoint.id,
    visitorId: touchpoint.visitorId,
    sessionId: touchpoint.sessionId,
    timestamp,
    type: touchpoint.type,
    page: touchpoint.page,
    source: touchpoint.source,
    medium: touchpoint.medium,
    campaign: touchpoint.campaign,
    utmParams: touchpoint.utmParams,
    gclid: touchpoint.gclid,
    ttl: getTTL(),
  };

  await client.send(
    new PutCommand({
      TableName: TOUCHPOINTS_TABLE,
      Item: item,
    })
  );
}

/**
 * Get all touchpoints for a visitor
 * Ordered chronologically by timestamp
 */
export async function getTouchpointsByVisitorId(
  visitorId: string,
  limit?: number
): Promise<Touchpoint[]> {
  try {
    const client = getClient();

    const result = await client.send(
      new QueryCommand({
        TableName: TOUCHPOINTS_TABLE,
        KeyConditionExpression: "pk = :pk",
        ExpressionAttributeValues: {
          ":pk": `TOUCHPOINT#${visitorId}`,
        },
        ScanIndexForward: true, // Chronological order
        ...(limit && { Limit: limit }),
      })
    );

    return (result.Items || []).map(itemToTouchpoint);
  } catch (error) {
    console.error(`DynamoDB getTouchpointsByVisitorId error for ${visitorId}:`, error);
    return [];
  }
}

/**
 * Get touchpoints for a date range
 * Note: Requires GSI on dateIndex for efficient querying
 * For now, scans by date partition
 */
export async function getTouchpointsForDateRange(
  startDate: string,
  endDate: string
): Promise<Touchpoint[]> {
  const touchpoints: Touchpoint[] = [];
  const client = getClient();

  // Query by date index (requires GSI: dateIndex-index)
  // For each date in range, query the GSI
  const start = new Date(startDate);
  const end = new Date(endDate);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = getDateString(d);

    try {
      const result = await client.send(
        new QueryCommand({
          TableName: TOUCHPOINTS_TABLE,
          IndexName: "dateIndex-index",
          KeyConditionExpression: "dateIndex = :date",
          ExpressionAttributeValues: {
            ":date": dateStr,
          },
        })
      );

      const dayTouchpoints = (result.Items || []).map(itemToTouchpoint);
      touchpoints.push(...dayTouchpoints);
    } catch (error) {
      // GSI might not exist - fallback to scan (less efficient)
      console.warn(`GSI query failed for ${dateStr}, may need to create dateIndex-index:`, error);
    }
  }

  return touchpoints.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

function itemToTouchpoint(item: Record<string, unknown>): Touchpoint {
  return {
    id: item.id as string,
    visitorId: item.visitorId as string,
    sessionId: item.sessionId as string,
    timestamp: new Date(item.timestamp as string),
    type: item.type as Touchpoint["type"],
    page: item.page as string,
    source: item.source as string,
    medium: item.medium as string,
    campaign: item.campaign as string | undefined,
    utmParams: item.utmParams as Touchpoint["utmParams"],
    gclid: item.gclid as string | undefined,
  };
}

// ============================================
// Opportunity Storage
// ============================================

/**
 * Store an opportunity in DynamoDB
 * PK: OPPORTUNITY#visitorId
 * SK: timestamp#opportunityId
 */
export async function storeOpportunityToDB(opportunity: Opportunity): Promise<void> {
  const client = getClient();
  const timestamp = opportunity.timestamp.toISOString();

  const item: StoredOpportunity & { pk: string; sk: string; dateIndex: string } = {
    pk: `OPPORTUNITY#${opportunity.visitorId}`,
    sk: `${timestamp}#${opportunity.id}`,
    dateIndex: getDateString(opportunity.timestamp),
    id: opportunity.id,
    visitorId: opportunity.visitorId,
    timestamp,
    dealValue: opportunity.dealValue,
    attributionSnapshot: opportunity.attributionSnapshot
      ? JSON.stringify(opportunity.attributionSnapshot)
      : undefined,
    ttl: getTTL(),
  };

  await client.send(
    new PutCommand({
      TableName: OPPORTUNITIES_TABLE,
      Item: item,
    })
  );
}

/**
 * Get the most recent opportunity for a visitor
 */
export async function getOpportunityByVisitorId(
  visitorId: string
): Promise<Opportunity | null> {
  try {
    const client = getClient();

    const result = await client.send(
      new QueryCommand({
        TableName: OPPORTUNITIES_TABLE,
        KeyConditionExpression: "pk = :pk",
        ExpressionAttributeValues: {
          ":pk": `OPPORTUNITY#${visitorId}`,
        },
        ScanIndexForward: false, // Most recent first
        Limit: 1,
      })
    );

    if (!result.Items || result.Items.length === 0) {
      return null;
    }

    return itemToOpportunity(result.Items[0]);
  } catch (error) {
    console.error(`DynamoDB getOpportunityByVisitorId error for ${visitorId}:`, error);
    return null;
  }
}

/**
 * Get opportunities for a date range
 */
export async function getOpportunitiesForDateRange(
  startDate: string,
  endDate: string
): Promise<Opportunity[]> {
  const opportunities: Opportunity[] = [];
  const client = getClient();

  const start = new Date(startDate);
  const end = new Date(endDate);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = getDateString(d);

    try {
      const result = await client.send(
        new QueryCommand({
          TableName: OPPORTUNITIES_TABLE,
          IndexName: "dateIndex-index",
          KeyConditionExpression: "dateIndex = :date",
          ExpressionAttributeValues: {
            ":date": dateStr,
          },
        })
      );

      const dayOpportunities = (result.Items || []).map(itemToOpportunity);
      opportunities.push(...dayOpportunities);
    } catch (error) {
      console.warn(`GSI query failed for opportunities on ${dateStr}:`, error);
    }
  }

  return opportunities;
}

function itemToOpportunity(item: Record<string, unknown>): Opportunity {
  return {
    id: item.id as string,
    visitorId: item.visitorId as string,
    timestamp: new Date(item.timestamp as string),
    dealValue: item.dealValue as number | undefined,
    attributionSnapshot: item.attributionSnapshot
      ? (JSON.parse(item.attributionSnapshot as string) as AttributionResult)
      : undefined,
  };
}

// ============================================
// Self-Reported Attribution Storage
// ============================================

/**
 * Store self-reported attribution source
 * PK: SELF_REPORTED#visitorId
 * SK: timestamp
 */
export async function storeSelfReportedSourceToDB(
  source: SelfReportedSource
): Promise<void> {
  const client = getClient();
  const timestamp = source.timestamp.toISOString();

  const item: StoredSelfReportedSource & { pk: string; sk: string } = {
    pk: `SELF_REPORTED#${source.visitorId}`,
    sk: timestamp,
    visitorId: source.visitorId,
    timestamp,
    response: source.response,
    normalizedChannel: source.normalizedChannel,
    ttl: getTTL(),
  };

  await client.send(
    new PutCommand({
      TableName: SELF_REPORTED_TABLE,
      Item: item,
    })
  );
}

/**
 * Get self-reported source for a visitor
 */
export async function getSelfReportedSourceByVisitorId(
  visitorId: string
): Promise<SelfReportedSource | null> {
  try {
    const client = getClient();

    const result = await client.send(
      new QueryCommand({
        TableName: SELF_REPORTED_TABLE,
        KeyConditionExpression: "pk = :pk",
        ExpressionAttributeValues: {
          ":pk": `SELF_REPORTED#${visitorId}`,
        },
        ScanIndexForward: false, // Most recent first
        Limit: 1,
      })
    );

    if (!result.Items || result.Items.length === 0) {
      return null;
    }

    const item = result.Items[0];
    return {
      visitorId: item.visitorId as string,
      timestamp: new Date(item.timestamp as string),
      response: item.response as string,
      normalizedChannel: item.normalizedChannel as string | undefined,
    };
  } catch (error) {
    console.error(`DynamoDB getSelfReportedSourceByVisitorId error for ${visitorId}:`, error);
    return null;
  }
}
