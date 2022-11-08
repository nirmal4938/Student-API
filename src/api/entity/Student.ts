import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum Status {
    LIVE = "Live",
    SUSPENDED = "Suspended",
}
@Entity('student')
export class Student {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    city!: string;

    @Column("date")
    dateOfBirth!: string;

    @Column()
    age!: number;

    @Column()
    standard!: number;

    @Column("simple-array")
    skills!: string[];

    @Column()
    briefIntro!: string;

    @Column("date")
    enrollmentFrom!: string;

    @Column("date")
    enrollmentTo!: string;

    @Column({
        type: "enum",
        enum: Status,
    })
    status!: Status;

    @Column()
    isActive!: boolean;
    @CreateDateColumn({
		type: 'timestamp',
	})
	created_at!: Date;

	@UpdateDateColumn({
		type: 'timestamp',
	})
	updated_at!: Date;

}