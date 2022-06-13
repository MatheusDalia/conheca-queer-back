import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Personality {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image : string;

    @Column()
    title: string;

    @Column()
    description: string

    @Column({ nullable: true })
    email: string

    @Column({ nullable: true })
    youtube: string

    @Column({ nullable: true })
    instagram: string

}
