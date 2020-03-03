import bcrypt from "bcrypt";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/User";

export async function hashPassword(
    password: string,
    rounds: number,
): Promise<string> {
    const salt = await bcrypt.genSalt(rounds);
    return bcrypt.hash(password, salt);
}


export async function comparePassword(
    providedPass: string,
    email: string,
): Promise<boolean> {

    var validateUser: User | any = await getCustomRepository(UserRepository).findByEmail(email);

    if (!validateUser) {
        return false;        
    }

    const passwordIsMatched = await bcrypt.compare(providedPass, validateUser.password);

    return passwordIsMatched;

}