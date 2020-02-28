import { Entity, Column, PrimaryColumn,ObjectIdColumn } from "typeorm";

@Entity()
export class Products {

    @ObjectIdColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column()
    image: string;

}