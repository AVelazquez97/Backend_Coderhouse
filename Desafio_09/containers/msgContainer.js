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
        await createTable(this.config, this.tableName);
      }
    } catch (error) {
      throw error;
    }
  };

  insertMsg = async (msgData) => {
    try {
      const { email, firstName, lastName, age, nickName, avatar } =
        msgData.author;
      const msg = msgData.msg;
      const fyh = msgData.fyh;

      const data = {
        email,
        firstName,
        lastName,
        age,
        nickName,
        avatar,
        msg,
        fyh,
      };
      await insertNewElement(this.config, this.tableName, data);
    } catch (error) {
      throw `${error}`;
    }
  };

  readMsgs = async () => {
    try {
      let messages = await readAllElements(this.config, this.tableName);
      return messages;
    } catch (error) {
      throw `${error}`;
    }
  };
}

export default MsgContainer;
