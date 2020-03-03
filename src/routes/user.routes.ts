import { Router } from "express";
import usercontroller from "../controllers/user.controller";

const router = Router();


router.get('/user', usercontroller.getUsers);
router.get('/user/:id', usercontroller.getUser);
router.put('/user/:id', usercontroller.updateUser);
router.delete('/user/:id', usercontroller.deleteUser);
router.post('/user/signup/', usercontroller.createUser);
router.post('/user/signin/', usercontroller.login);


export default router;