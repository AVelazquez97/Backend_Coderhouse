import { Router } from 'express';
import ProductFakerMock from '../mocks/productFakerMock.js';

const router = Router();

<<<<<<< HEAD
router.get('/productos-test', (req, res) => {
  const fakeProducts = new ProductFakerMock();
  const products = fakeProducts.populateProducts(5);
=======
router.get('/', (req, res) => {
  const fakeProducts = new ProductFakerMock();
  const products = fakeProducts.populateProducts(5);

>>>>>>> 17010ff2cf077b8d6fc60c63c333bb34b7bb398b
  res.render('partials/viewFakeProducts', {
    products,
    existProducts: products.length,
  });
});

export default router;
