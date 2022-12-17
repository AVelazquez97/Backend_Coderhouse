import { graphqlHTTP } from 'express-graphql';
import messageSchema from '../../models/graphql/messages.model.js';
import MessageService from '../../services/graphql/messages.service.js';

class GraphQLMessagesController {
  constructor() {
    this.service = new MessageService();
    this.config = {
      schema: messageSchema,
      rootValue: {
        getMessages: this.service.getMessages,
        getMessage: this.service.getMessage,
        createMessage: this.service.createMessage,
      },
      graphiql: true
    };
    return graphqlHTTP(this.config);
  }
}

export default GraphQLMessagesController;