import MongoDBContainer from '../../containers/mongoDBContainer.js';
import productModel from '../../../models/mongoose/products.model.js';
import ProductDTO from '../../DTO/productDTO.js';
import { loggerError } from '../../../config/log4.js';

let instanceMongoDB = null;
class ProductsDAOMongoDB extends MongoDBContainer {
  constructor() {
    super();
    this.collectionName = productModel;
  }

  static getInstance = () => {
    if (!instanceMongoDB) {
      instanceMongoDB = new ProductsDAOMongoDB();
    }
    return instanceMongoDB;
  };

  insertProduct = async (productData) => {
    try {
      await this.collectionName.create(productData);
      return { success: 'El producto fue añadido al sistema.' };
    } catch (error) {
      loggerError.error(error);
      throw error;
    }
  };

  readProducts = async () => {
    try {
      const products = await this.collectionName.find();
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

export default ProductsDAOMongoDB;
