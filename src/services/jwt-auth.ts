import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import config from "../config/config";

export class jwtAuth {

    public async createToken(user: User): Promise<string> {

        const token = jwt.sign({id: user.id, email: user.email }, config.jwtSecret || 'tokentest', {
            expiresIn: 60 * 60 * 24
        })

        return token

    }

    public async validateToken(
        token: string
    ): Promise<string | object> {

        const invalidToken = "Error verifying token : 'token' is null";

        if (!token) {

            return invalidToken

        }

        const payload = jwt.verify(token, config.jwtSecret || 'tokentest')

        return payload
    }


}

const jwtauth = new jwtAuth();
export default jwtauth;