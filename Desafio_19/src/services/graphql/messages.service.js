import DAOFactory from '../../persistency/DAO/DAOFactory.js';
import { loggerError } from '../../config/log4.js';
import { PERSISTENCY } from '../../config/index.js';

let messageDAO;

(async () => {
  try {
    messageDAO = await DAOFactory.getPersistency('messages', PERSISTENCY);
  } catch (error) {
    loggerError.error(error);
    throw `${error}`;
  }
})();

class MessageService {
  getMessages = async ({ key, value }) => {
    try {
      const messages = Object.values(await messageDAO.readMsgs());
      if (key && value) {
        return messages.filter((message) => message[key] === value);
      } else {
        return messages;
      }
    } catch (error) {
      throw error;
    }
  };

  getMessage = async ({ id }) => {
    try {
      const message = await messageDAO.readMessageById(id);
      return message;
    } catch (error) {
      throw error;
    }
  };

  createMessage = async ({ data }) => {
    try {
      const message = {
        author: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          nickName: data.nickName,
          avatar: data.avatar,
        },
        msg: data.msg,
        fyh: new Date().toLocaleString()
      };

      const messageId = await messageDAO.insertMsg(message);
      return await this.getMessage({ id: messageId });
    } catch (error) {
      throw error;
    }
  };
}

export default MessageService;