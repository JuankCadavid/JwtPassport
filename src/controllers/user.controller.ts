import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/user.repository";
import { comparePassword } from "../services/hash.password.bcryptjs";
import validator from "../services/validator";
import jwtauth from "../services/jwt-auth";

class userController {

    public async getUsers(req: Request, res: Response): Promise<Response> {

        const users = await getCustomRepository(UserRepository).find();
        return res.json(users);

    }

    public async getUser(req: Request, res: Response): Promise<Response> {

        const email = req.body.email;
        const user = await getCustomRepository(UserRepository).findOne(email);
        return res.json(user);
    }

    public async createUser(req: Request, res: Response): Promise<Response> {

        const user: User = req.body;

        const validateCredentials = await validator.validateCredentials(user.email, user.password)

        if (validateCredentials) {
            return res.status(400).json({ msg: validateCredentials })
        }

        const newUser = getCustomRepository(UserRepository).create(user);
        getCustomRepository(UserRepository).save(newUser);
        return res.json(newUser);

    }

    public async updateUser(req: Request, res: Response): Promise<Response> {

        const email = req.params.email;
        const user = await getCustomRepository(UserRepository).findOne(email);

        if (user) {

            getCustomRepository(UserRepository).merge(user, req.body);
            const result = await getCustomRepository(UserRepository).save(user);
            return res.json(result);

        }

        return res.status(404).json({ msg: 'Not user found' });

    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {

        const result = getCustomRepository(UserRepository).delete(req.params.email);
        return res.json(result);

    }


    public async login(req: Request, res: Response): Promise<Response> {

        const user: User | any = req.body;

        const validate = await comparePassword(user.password, user.email)

        if (!validate) {

            return res.status(404).json({ msg: 'Validate Credentials' });
        }

        const token = await jwtauth.createToken(user);

        return res.json({ token: token })

    }

}

const usercontroller = new userController();
export default usercontroller;
