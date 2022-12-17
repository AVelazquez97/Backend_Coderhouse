import MongoDBContainer from '../../containers/mongoDBContainer.js';
import messageModel from '../../../models/mongoose/messages.model.js';
import MsgDTO from '../../DTO/msgDTO.js';
import { loggerError } from '../../../config/log4.js';

let instanceMongoDB = null;
class MessagesDAOMongoDB extends MongoDBContainer {
  constructor() {
    super();
    this.collectionName = messageModel;
  }

  static getInstance = () => {
    if (!instanceMongoDB) {
      instanceMongoDB = new MessagesDAOMongoDB();
    }
    return instanceMongoDB;
  };

  insertMsg = async (msgData) => {
    try {
      const { email, firstName, lastName, age, nickName, avatar } =
        msgData.author;
      const msg = msgData.msg;

      const data = {
        email,
        firstName,
        lastName,
        age,
        nickName,
        avatar,
        msg,
      };
      const addedMessage = await this.collectionName.create(data);
      return addedMessage.id;
    } catch (error) {
      loggerError.error(error);
      throw error.message;
    }
  };

  readMsgs = async () => {
    try {
      const messages = await this.collectionName.find();
      if (!messages.length) {
        throw new Error(
          'Error al listar: no se encontraron mensajes en la base de datos.'
        );
      }
      return MsgDTO.toDTO(messages);
    } catch (error) {
      loggerError.error(error);
      throw error.message;
    }
  };

  readMessageById = async (id) => {
    try {
      const message = await this.collectionName.findById(id);
      if (!message) {
        throw new Error(
          'Error al listar: no se encontró el mensaje con el id indicado.'
        );
      }
      return MsgDTO.toDTO(message);
    } catch (error) {
      throw error.message;
    }
  };
}

export default MessagesDAOMongoDB;
