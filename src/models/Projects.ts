import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Projects {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    image: string

    @Column({nullable: true})
    alt: string

    @Column()
    link: string
}