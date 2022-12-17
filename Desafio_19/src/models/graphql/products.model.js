import { buildSchema } from 'graphql';

const productSchema = buildSchema(`
  input ProductInput {
    title: String,
    price: Float,
    thumbnail: String
  }
  type Product {
    id: ID!
    title: String,
    price: Float
    thumbnail: String
  }
  type Query {
    getProduct(id: ID!): Product,
    getProducts(key: String, value: String): [Product],
  }
  type Mutation {
    createProduct(data: ProductInput): Product
    updateProduct(id: ID!, data: ProductInput): Product,
    deleteProduct(id: ID!): Product,
  }
`);
export default productSchema;
