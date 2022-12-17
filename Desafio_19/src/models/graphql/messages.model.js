import { buildSchema } from 'graphql';

const messageSchema = buildSchema(`
  input MessageInput {
    email: String,
    firstName: String,
    lastName: String,
    age: Int,
    nickName: String,
    avatar: String,
    msg: String,
  }
  type Message {
    id: ID!
    email: String,
    firstName: String,
    lastName: String,
    age: Int,
    nickName: String,
    avatar: String,
    msg: String,
    fyh: String,
  }
  type Query {
    getMessage(id: ID!): Message,
    getMessages(key: String, value: String): [Message],
  }
  type Mutation {
    createMessage(data: MessageInput): Message
  }
`);
export default messageSchema;