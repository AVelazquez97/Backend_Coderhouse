import knex from 'knex';
import createTable from '../utils/createTableMsgs.js';
import insertNewElement from '../utils/insertElement.js';
import readAllElements from '../utils/readElements.js';

class MsgContainer {
  constructor(dbConfigs, tableName) {
    this.db = knex(dbConfigs);
    this.config = dbConfigs;
    this.tableName = tableName;
    this.#existTable();
  }

  #existTable = async () => {
    try {
      if (!(await this.db.schema.hasTable(this.tableName))) {
        createTable(this.config, this.tableName);
      }
    } catch (error) {
      throw error;
    }
  };

  insertMsg = async (msgData) => {
    try {
      insertNewElement(this.config, this.tableName, msgData);
    } catch (error) {
      throw `${error}`;
    }
  };

  readMsgs = async () => {
    try {
      const messages = await readAllElements(this.config, this.tableName);
      if (!messages.length) {
        return 'No se encontraron mensajes en la base de datos.';
      }
      return messages;
    } catch (error) {
      throw `${error}`;
    }
  };
}

export default MsgContainer;
