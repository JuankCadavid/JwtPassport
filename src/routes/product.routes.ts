import { Router } from "express";
import productscontroller from "../controllers/product.controller";
import passport from "passport";


const router = Router ();

router.get('/products',passport.authenticate('jwt',{session:false}),productscontroller.getProducts);
router.get('/products/:id',productscontroller.getProduct);
router.get('/products/name/:name',productscontroller.getProductName);
router.post('/products',productscontroller.createProducts);
router.put('/products/:id',productscontroller.updateProduct);
router.delete('/products/:id',productscontroller.deleteProduct);


export default router;