import { Entity, Column, ObjectIdColumn, BeforeInsert } from "typeorm";
import bcrypt from "bcrypt";


@Entity()
export class User {

    @ObjectIdColumn()
    id: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;

    }



}