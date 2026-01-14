/**
 * AWS SDK Mock
 * Mocks AWS services for testing without actual AWS calls
 */

export const DynamoDBClient = jest.fn().mockImplementation(() => ({
  send: jest.fn().mockResolvedValue({}),
}))

export const DynamoDBDocumentClient = {
  from: jest.fn().mockReturnValue({
    send: jest.fn().mockResolvedValue({}),
  }),
}

export const PutCommand = jest.fn()
export const GetCommand = jest.fn()
export const QueryCommand = jest.fn()
export const UpdateCommand = jest.fn()
export const DeleteCommand = jest.fn()

export const SESClient = jest.fn().mockImplementation(() => ({
  send: jest.fn().mockResolvedValue({ MessageId: 'test-message-id' }),
}))

export const SendEmailCommand = jest.fn()
