import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserAuth } from 'src/user-auths/user-auth.entity';
import { PrimaryGeneratedColumn, Column, OneToOne, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'first_name' })
    @Field()
    firstName: string;

    @Column({ name: 'last_name' })
    @Field()
    lastName: string;

    @Column()
    @Field()
    bio?: string;

    @Column({ name: 'date_of_birth', type: 'timestamptz' })
    @Field()
    dateOfBirth: string;

    @OneToOne(() => UserAuth)
    @Field(() => UserAuth)
    userAuth: UserAuth;
}
