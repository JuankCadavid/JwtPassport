import { Router } from "express";

const router = Router ();

import productscontroller from "../controllers/product.controller";


router.get('/products',productscontroller.getProducts);
router.get('/products/:id',productscontroller.getProduct);
router.get('/products/name/:name',productscontroller.getProductName);
router.post('/products',productscontroller.createProducts);
router.put('/products/:id',productscontroller.updateProduct);
router.delete('/products/:id',productscontroller.deleteProduct);


export default router;