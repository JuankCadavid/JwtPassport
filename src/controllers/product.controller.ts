import { Request, Response } from "express";
import { getRepository, getCustomRepository } from "typeorm";
import { Products } from "../entities/Product";
import { ProductsRepository } from "../repositories/product.repository";


class productsController {

    // CustomRepository
    public async getProducts(req: Request, res: Response): Promise<Response> {

        const products = await getCustomRepository(ProductsRepository).find();
        return res.json(products);

    }

    // Standar Repository 
    public async getProduct(req: Request, res: Response): Promise<Response> {

        const id = req.params.id;

        const product = await getCustomRepository(ProductsRepository).findOne(id);
        return res.json(product);

    }

    // CustomRepository
    public async getProductName(req: Request, res: Response): Promise<Response> {

        const name = req.params.name;

        const product = await getCustomRepository(ProductsRepository).findByName(name);
        return res.json(product);

    }

    public async createProducts(req: Request, res: Response): Promise<Response> {

        const newProduct = getRepository(Products).create(req.body);
        const result = await getRepository(Products).save(newProduct);

        return res.json(result);

    }


    public async updateProduct(req: Request, res: Response): Promise<Response> {

        const id = req.params.id;

        const product = await getRepository(Products).findOne(id);

        if (product) {

            getRepository(Products).merge(product, req.body);
            const result = await getRepository(Products).save(product);
            return res.json(result);
        }

        return res.status(404).json({ msg: 'Not product found' });

    }


    public async deleteProduct(req: Request, res: Response): Promise<Response> {

        const result = await getRepository(Products).delete(req.params.id);

        return res.json(result);

    }

}


const productscontroller = new productsController();
export default productscontroller;
