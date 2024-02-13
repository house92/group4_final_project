import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Index, Column, OneToOne, JoinColumn } from 'typeorm';

@ObjectType()
@Entity()
export class UserAuth {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Field()
    @Index({ unique: true })
    email: string;

    @Column()
    passwordhash: string;

    @OneToOne(() => User, (user) => user.userAuth)
    @Field(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
}
