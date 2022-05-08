import {Entity, ObjectID, ObjectIdColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity {
	@ObjectIdColumn()
	_id: ObjectID;
	
	@Column()
	firstName: string;
	
	@Column()
	lastName: string;
	
	@Column({unique: true})
	email: string;
	
	@Column({length: 6})
	password: string;
}
