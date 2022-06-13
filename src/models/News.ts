import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class News {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    image : string;

    @Column({nullable: true})
    alt : string;

    @Column()
    title : string;

    @Column()
    text : string;

    @Column()
    link : string;

}
