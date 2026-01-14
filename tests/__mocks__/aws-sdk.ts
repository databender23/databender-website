// Mock AWS SDK for testing
export const mockDynamoDBClient = {
  send: jest.fn().mockResolvedValue({}),
}

export const mockSESClient = {
  send: jest.fn().mockResolvedValue({ MessageId: 'test-message-id' }),
}

jest.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: jest.fn(() => mockDynamoDBClient),
}))

jest.mock('@aws-sdk/lib-dynamodb', () => ({
  DynamoDBDocumentClient: {
    from: jest.fn(() => mockDynamoDBClient),
  },
  PutCommand: jest.fn(),
  GetCommand: jest.fn(),
  QueryCommand: jest.fn(),
  UpdateCommand: jest.fn(),
  DeleteCommand: jest.fn(),
  ScanCommand: jest.fn(),
}))

jest.mock('@aws-sdk/client-ses', () => ({
  SESClient: jest.fn(() => mockSESClient),
  SendEmailCommand: jest.fn(),
}))
