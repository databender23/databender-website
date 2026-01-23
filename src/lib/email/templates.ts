/**
 * High-Touch Email Templates
 *
 * Templates for cold outreach and manual high-touch emails.
 * Stored in DynamoDB for flexibility and admin management.
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const TEMPLATES_TABLE = "databender-leads";
const REGION = process.env.DYNAMODB_REGION || "us-east-1";

function getClient(): DynamoDBDocumentClient {
  const client = new DynamoDBClient({ region: REGION });
  return DynamoDBDocumentClient.from(client);
}

export interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  subject: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTemplateInput {
  name: string;
  category: string;
  subject: string;
  body: string;
}

export interface UpdateTemplateInput {
  name?: string;
  category?: string;
  subject?: string;
  body?: string;
}

/**
 * Create a new email template
 */
export async function createTemplate(
  input: CreateTemplateInput
): Promise<EmailTemplate> {
  const client = getClient();
  const now = new Date().toISOString();
  const id = uuidv4();

  const template: EmailTemplate = {
    id,
    name: input.name,
    category: input.category,
    subject: input.subject,
    body: input.body,
    createdAt: now,
    updatedAt: now,
  };

  // Store with pk/sk pattern in same table as leads
  await client.send(
    new PutCommand({
      TableName: TEMPLATES_TABLE,
      Item: {
        pk: "EMAIL_TEMPLATE",
        sk: `#ID#${id}`,
        ...template,
      },
    })
  );

  return template;
}

/**
 * Get all email templates
 */
export async function listTemplates(): Promise<EmailTemplate[]> {
  const client = getClient();

  const result = await client.send(
    new QueryCommand({
      TableName: TEMPLATES_TABLE,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": "EMAIL_TEMPLATE",
      },
    })
  );

  if (!result.Items) {
    return [];
  }

  return result.Items.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    subject: item.subject,
    body: item.body,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  })) as EmailTemplate[];
}

/**
 * Get a single template by ID
 */
export async function getTemplate(id: string): Promise<EmailTemplate | null> {
  const client = getClient();

  const result = await client.send(
    new GetCommand({
      TableName: TEMPLATES_TABLE,
      Key: {
        pk: "EMAIL_TEMPLATE",
        sk: `#ID#${id}`,
      },
    })
  );

  if (!result.Item) {
    return null;
  }

  return {
    id: result.Item.id,
    name: result.Item.name,
    category: result.Item.category,
    subject: result.Item.subject,
    body: result.Item.body,
    createdAt: result.Item.createdAt,
    updatedAt: result.Item.updatedAt,
  };
}

/**
 * Update a template
 */
export async function updateTemplate(
  id: string,
  input: UpdateTemplateInput
): Promise<EmailTemplate | null> {
  const client = getClient();
  const now = new Date().toISOString();

  // Build update expression dynamically
  const updateExpressions: string[] = ["updatedAt = :updatedAt"];
  const expressionAttributeValues: Record<string, unknown> = {
    ":updatedAt": now,
  };
  const expressionAttributeNames: Record<string, string> = {};

  if (input.name !== undefined) {
    updateExpressions.push("#name = :name");
    expressionAttributeNames["#name"] = "name";
    expressionAttributeValues[":name"] = input.name;
  }

  if (input.category !== undefined) {
    updateExpressions.push("category = :category");
    expressionAttributeValues[":category"] = input.category;
  }

  if (input.subject !== undefined) {
    updateExpressions.push("subject = :subject");
    expressionAttributeValues[":subject"] = input.subject;
  }

  if (input.body !== undefined) {
    updateExpressions.push("body = :body");
    expressionAttributeValues[":body"] = input.body;
  }

  const params: {
    TableName: string;
    Key: Record<string, string>;
    UpdateExpression: string;
    ExpressionAttributeValues: Record<string, unknown>;
    ReturnValues: "ALL_NEW";
    ExpressionAttributeNames?: Record<string, string>;
  } = {
    TableName: TEMPLATES_TABLE,
    Key: {
      pk: "EMAIL_TEMPLATE",
      sk: `#ID#${id}`,
    },
    UpdateExpression: `SET ${updateExpressions.join(", ")}`,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  if (Object.keys(expressionAttributeNames).length > 0) {
    params.ExpressionAttributeNames = expressionAttributeNames;
  }

  try {
    const result = await client.send(new UpdateCommand(params));

    if (!result.Attributes) {
      return null;
    }

    return {
      id: result.Attributes.id,
      name: result.Attributes.name,
      category: result.Attributes.category,
      subject: result.Attributes.subject,
      body: result.Attributes.body,
      createdAt: result.Attributes.createdAt,
      updatedAt: result.Attributes.updatedAt,
    };
  } catch (error) {
    console.error(`[Templates] Failed to update template ${id}:`, error);
    return null;
  }
}

/**
 * Delete a template
 */
export async function deleteTemplate(id: string): Promise<boolean> {
  const client = getClient();

  try {
    await client.send(
      new DeleteCommand({
        TableName: TEMPLATES_TABLE,
        Key: {
          pk: "EMAIL_TEMPLATE",
          sk: `#ID#${id}`,
        },
      })
    );
    return true;
  } catch (error) {
    console.error(`[Templates] Failed to delete template ${id}:`, error);
    return false;
  }
}

/**
 * Get default templates (pre-seeded)
 */
export function getDefaultTemplates(): CreateTemplateInput[] {
  return [
    {
      name: "Lateral Hire Trigger",
      category: "trigger",
      subject: "Congratulations on the new partner",
      body: `Hi {{firstName}},

I noticed {{company}} recently brought on a new lateral partner. That's exciting news.

In my experience working with mid-sized firms, lateral hires often surface a familiar challenge: the new partner brings institutional knowledge and client relationships that need to be captured and made accessible across the firm.

If that resonates, I'd be happy to share how we've helped firms like yours turn tribal knowledge into searchable intelligence. No pressure, just a quick call to see if it's worth exploring.

Best,
Grant`,
    },
    {
      name: "Audit Delivery",
      category: "audit",
      subject: "Your complimentary data audit",
      body: `Hi {{firstName}},

As promised, I've completed a preliminary review of {{company}}'s data landscape. I've identified a few quick wins and some larger opportunities.

Quick wins (can implement this quarter):
- [Specific finding 1]
- [Specific finding 2]

Larger opportunity:
- [Strategic insight]

Would it be helpful to walk through these findings in a 20-minute call? I can share my screen and dive into the specifics.

Best,
Grant`,
    },
    {
      name: "General Introduction",
      category: "intro",
      subject: "Quick question about {{company}}'s data strategy",
      body: `Hi {{firstName}},

I'm reaching out because I've been following {{company}}'s growth and I'm curious about how you're approaching data and analytics.

We work with mid-sized firms that want enterprise-grade data capabilities without the enterprise price tag or timeline. Our specialty is helping businesses like yours turn scattered data into actionable intelligence.

Would it make sense to have a quick conversation about what you're working on?

Best,
Grant`,
    },
  ];
}

/**
 * Seed default templates if none exist
 */
export async function seedDefaultTemplates(): Promise<void> {
  const existing = await listTemplates();

  if (existing.length > 0) {
    console.log("[Templates] Templates already exist, skipping seed");
    return;
  }

  const defaults = getDefaultTemplates();

  for (const template of defaults) {
    await createTemplate(template);
    console.log(`[Templates] Created default template: ${template.name}`);
  }
}
