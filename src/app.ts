import express from "express";
import morgan from "morgan";
import cors from "cors"
import { createConnection } from "typeorm";
import "reflect-metadata";

import ProductosRoutes from "./routes/product.routes";



//Initialization
const app = express();
createConnection();

//Settings
app.set('port',process.env.port || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes
app.get('/',(req,res)=>{
    res.send(`The API is at http://localhost:${app.get('port')}`);
});
app.use('/api/',ProductosRoutes);


export default app;
