import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import type { TrackedEvent, Session, ConversionPath } from "./events";

const EVENTS_TABLE = "databender-analytics-events";
const SESSIONS_TABLE = "databender-analytics-sessions";
const CONVERSIONS_TABLE = "databender-analytics-conversions";
const REGION = process.env.DYNAMODB_REGION || "us-east-1";
const TTL_DAYS = 90;

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

export async function trackEvent(event: TrackedEvent): Promise<void> {
  const client = getClient();
  const dateStr = getDateString(new Date(event.timestamp));

  const item = {
    pk: `EVENT#${dateStr}`,
    sk: `${event.timestamp}#${event.eventId}`,
    ...event,
    ttl: getTTL(),
  };

  await client.send(
    new PutCommand({
      TableName: EVENTS_TABLE,
      Item: item,
    })
  );
}

export async function updateSession(session: Partial<Session> & { sessionId: string; visitorId: string }): Promise<void> {
  const client = getClient();
  const dateStr = getDateString();

  const item = {
    pk: `SESSION#${dateStr}`,
    sk: session.sessionId,
    ...session,
    ttl: getTTL(),
  };

  await client.send(
    new PutCommand({
      TableName: SESSIONS_TABLE,
      Item: item,
    })
  );
}

export async function getEventsForDate(date: string): Promise<TrackedEvent[]> {
  try {
    const client = getClient();

    const result = await client.send(
      new QueryCommand({
        TableName: EVENTS_TABLE,
        KeyConditionExpression: "pk = :pk",
        ExpressionAttributeValues: {
          ":pk": `EVENT#${date}`,
        },
      })
    );

    return (result.Items || []) as TrackedEvent[];
  } catch (error) {
    console.error(`DynamoDB getEventsForDate error for ${date}:`, error);
    return [];
  }
}

export async function getSessionsForDate(date: string): Promise<Session[]> {
  try {
    const client = getClient();

    const result = await client.send(
      new QueryCommand({
        TableName: SESSIONS_TABLE,
        KeyConditionExpression: "pk = :pk",
        ExpressionAttributeValues: {
          ":pk": `SESSION#${date}`,
        },
      })
    );

    return (result.Items || []) as Session[];
  } catch (error) {
    console.error(`DynamoDB getSessionsForDate error for ${date}:`, error);
    return [];
  }
}

export async function getEventsForDateRange(startDate: string, endDate: string): Promise<TrackedEvent[]> {
  const events: TrackedEvent[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = getDateString(d);
    const dayEvents = await getEventsForDate(dateStr);
    events.push(...dayEvents);
  }

  return events;
}

export async function getSessionsForDateRange(startDate: string, endDate: string): Promise<Session[]> {
  const sessions: Session[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = getDateString(d);
    const daySessions = await getSessionsForDate(dateStr);
    sessions.push(...daySessions);
  }

  return sessions;
}

/**
 * Store a conversion path for attribution analysis
 */
export async function storeConversionPath(conversion: ConversionPath): Promise<void> {
  const client = getClient();
  const dateStr = getDateString(new Date(conversion.timestamp));

  const item = {
    pk: `CONVERSION#${dateStr}`,
    sk: `${conversion.timestamp}#${conversion.conversionId}`,
    ...conversion,
    ttl: getTTL(),
  };

  await client.send(
    new PutCommand({
      TableName: CONVERSIONS_TABLE,
      Item: item,
    })
  );
}

/**
 * Get conversion paths for a specific date
 */
export async function getConversionPathsForDate(date: string): Promise<ConversionPath[]> {
  try {
    const client = getClient();

    const result = await client.send(
      new QueryCommand({
        TableName: CONVERSIONS_TABLE,
        KeyConditionExpression: "pk = :pk",
        ExpressionAttributeValues: {
          ":pk": `CONVERSION#${date}`,
        },
      })
    );

    return (result.Items || []) as ConversionPath[];
  } catch (error) {
    console.error(`DynamoDB getConversionPathsForDate error for ${date}:`, error);
    return [];
  }
}

/**
 * Get conversion paths for a date range
 */
export async function getConversionPathsForDateRange(
  startDate: string,
  endDate: string
): Promise<ConversionPath[]> {
  const conversions: ConversionPath[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = getDateString(d);
    const dayConversions = await getConversionPathsForDate(dateStr);
    conversions.push(...dayConversions);
  }

  return conversions;
}
