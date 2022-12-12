import SQLContainer from '../../containers/SQLContainer.js';
import ProductDTO from '../../DTO/productDTO.js';
import { loggerError } from '../../../config/log4.js';
import insertNewElement from '../../../utils/knex/insertElement.js';
import readAllElements from '../../../utils/knex/readElements.js';
import MySQLConnection from '../../../config/databases/configMySQL.js';

const mysql = MySQLConnection.getMySQLConnectionInstance();

let instanceMySQL = null;
class ProductsDAOMySQL extends SQLContainer {
  constructor() {
    super(mysql.configData(), 'products');
  }

  static getInstance = () => {
    if (!instanceMySQL) {
      instanceMySQL = new ProductsDAOMySQL();
    }
    return instanceMySQL;
  };

  insertProduct = async (productData) => {
    try {
      const productInserted = await insertNewElement(this.config, this.tableName, productData);
      return { success: 'El producto fue añadido al sistema.' };
    } catch (error) {
      loggerError.error(error);
      throw error;
    }
  };

  readProducts = async () => {
    try {
      const products = await readAllElements(this.config, this.tableName);
      if (!products.length) {
        throw 'No se encontraron productos en la base de datos.';
      }
      return ProductDTO.toDTO(products);
    } catch (error) {
      loggerError.error(error);
      throw error;
    }
  };
}

export default ProductsDAOMySQL;