import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("subject")
export class Subject {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    subjectName: string;
    
}