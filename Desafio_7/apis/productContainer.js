import knex from 'knex';
import createTable from '../utils/createTableProducts.js';
import insertNewElement from '../utils/insertElement.js';
import readAllElements from '../utils/readElements.js';

class productContainer {
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

  insertProduct = async (productData) => {
    try {
      insertNewElement(this.config, this.tableName, productData);
    } catch (error) {
      throw `${error}`;
    }
  };

  readProducts = async () => {
    try {
      const products = await readAllElements(this.config, this.tableName);
      if (!products.length) {
        return 'No se encontraron productos en la base de datos.';
      }
      return products;
    } catch (error) {
      throw `${error}`;
    }
  };
}
export default productContainer;
