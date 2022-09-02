import knex from 'knex';
import createTable from '../utils/createTableMsgs.js';

class msgContainer {
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

  save = async (msgData) => {
    // try {
    //   const messages = await this.#viewFile();
    //   if (messages.length) {
    //     /*Si ya existen mensajes en el fichero, estos se deben mantener y agregar el nuevo*/
    //     await fs.promises.writeFile(
    //       this.fileRoute,
    //       JSON.stringify(
    //         [...messages, { ...msgData, id: messages.length + 1 }],
    //         null,
    //         4
    //       ),
    //       'utf-8'
    //     );
    //     return messages.length + 1;
    //   } else {
    //     await fs.promises.writeFile(
    //       this.fileRoute,
    //       JSON.stringify([{ ...msgData, id: 1 }], null, 4),
    //       'utf-8'
    //     );
    //     return 1;
    //   }
    // } catch (error) {
    //   throw `${error}`;
    // }
  };

  getAllMessages = async () => {
    //   try {
    //     const messages = await this.#viewFile();
    //     if (messages.length) {
    //       return messages;
    //     } else {
    //       return { error: 'No se encontraron mensajes' };
    //     }
    //   } catch (error) {
    //     throw `${error}`;
    //   }
  };
}

export default msgContainer;
