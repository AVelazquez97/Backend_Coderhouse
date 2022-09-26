import { Router } from 'express';
import ProductFakerMock from '../api/productFakerMock.js';

const router = Router();

router.get('/', (req, res) => {
  const fakeProducts = new ProductFakerMock();
  const products = fakeProducts.populateProducts(5);

  res.render('partials/viewFakeProducts', {
    products,
    existProducts: products.length,
  });
});

export default router;
