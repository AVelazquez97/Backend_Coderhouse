import SQLContainer from '../../containers/SQLContainer.js';
import MsgDTO from '../../DTO/msgDTO.js';
import { loggerError } from '../../../config/log4.js';
import insertNewElement from '../../../utils/knex/insertElement.js';
import readAllElements from '../../../utils/knex/readElements.js';
import getElementById from '../../../utils/knex/getElementById.js';
import MySQLConnection from '../../../config/databases/configMySQL.js';
import { formatDateToMysql } from '../../../utils/dateFormaterToMySQL.js';

const mysql = MySQLConnection.getMySQLConnectionInstance();

let instanceMySQL = null;
class MessagesDAOMySQL extends SQLContainer {
  constructor() {
    super(mysql.configData(), 'messages');
  }

  static getInstance = () => {
    if (!instanceMySQL) {
      instanceMySQL = new MessagesDAOMySQL();
    }
    return instanceMySQL;
  };

  insertMsg = async (msgData) => {
    try {
      const data = {
        email: msgData.author.email,
        firstName: msgData.author.firstName,
        lastName: msgData.author.lastName,
        age: msgData.author.age,
        nickName: msgData.author.nickName,
        avatar: msgData.author.avatar,
        msg: msgData.msg,
        fyh: formatDateToMysql(msgData.fyh),
      };
      const addedMessage = await insertNewElement(this.config, this.tableName, data);
      return addedMessage[0].toString();
    } catch (error) {
      loggerError.error(error);
      throw error.message;
    }
  };

  readMsgs = async () => {
    try {
      const messages = await readAllElements(this.config, this.tableName);
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
      const message = await getElementById(this.config, this.tableName, id);
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

export default MessagesDAOMySQL;