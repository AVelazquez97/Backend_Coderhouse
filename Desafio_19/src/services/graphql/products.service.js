import DAOFactory from '../../persistency/DAO/DAOFactory.js';
import { loggerError } from '../../config/log4.js';
import { PERSISTENCY } from '../../config/index.js';
import areFieldsFilled from '../../utils/areFieldsFilled.js';

let productDAO;
(async () => {
  try {
    productDAO = await DAOFactory.getPersistency('products', PERSISTENCY);
  } catch (error) {
    loggerError.error(error);
    throw `${error}`;
  }
})();

class ProductService {
  getProducts = async ({ key, value }) => {
    try {
      const products = Object.values(await productDAO.readProducts());
      if (key && value) {
        return products.filter((product) => product[key] === value);
      } else {
        return products;
      }
    } catch (error) {
      throw error;
    }
  };

  getProduct = async ({ id }) => {
    try {
      const product = await productDAO.readProductById(id);
      return product;
    } catch (error) {
      throw error;
    }
  };

  createProduct = async ({ data }) => {
    if (areFieldsFilled(data)) {
      const { title, thumbnail, price } = data;
      // Si no quedó ningún campo vacío, se procede a ingresar el producto
      try {
        const productId = await productDAO.insertProduct({
          title,
          price: parseFloat(price),
          thumbnail,
        });
        return await this.getProduct({ id: productId });
      } catch (error) {
        throw error;
      }
    } else {
      throw 'Error al insertar: uno o más campos quedaron vacíos.';
    }
  };
  updateProduct = async ({ id, data }) => {
    if (areFieldsFilled(data)) {
      const { title, thumbnail, price } = data;
      // Si no quedó ningún campo vacío, se procede a actualizar el producto
      try {
        const msg = await productDAO.updateProduct(
          { id },
          {
            title,
            price: parseFloat(price),
            thumbnail,
          }
        );
        return await this.getProduct({ id });
      } catch (error) {
        throw error;
      }
    } else {
      throw 'Error al actualizar: uno o más campos quedaron vacíos.';
    }
  }

  deleteProduct = async ({id}) => {
    try {
      const deletedProduct = await this.getProduct({ id });
      const msg = await productDAO.deleteProductById(id);
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}
  
export default ProductService;