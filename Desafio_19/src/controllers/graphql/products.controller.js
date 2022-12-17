import { graphqlHTTP } from 'express-graphql';
import productSchema from '../../models/graphql/products.model.js';
import ProductService from '../../services/graphql/products.service.js';

class GraphQLProductsController {
  constructor() {
    this.service = new ProductService();
    this.config = {
      schema: productSchema,
      rootValue: {
        getProduct: this.service.getProduct,
        getProducts: this.service.getProducts,
        createProduct: this.service.createProduct,
        updateProduct: this.service.updateProduct,
        deleteProduct: this.service.deleteProduct,
      },
      graphiql: true
    };
    return graphqlHTTP(this.config);
  }
}

export default GraphQLProductsController;