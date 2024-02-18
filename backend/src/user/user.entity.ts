import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserAuth } from 'src/user-auth/user-auth.entity';
import { PrimaryGeneratedColumn, Column, OneToOne, OneToMany, Entity } from 'typeorm';
import { BookReview } from 'src/bookreviews/bookreview.entity';

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

    @Column({ nullable: true })
    @Field({ nullable: true })
    bio?: string;

    @Column({ name: 'date_of_birth', type: 'timestamptz' })
    @Field()
    dateOfBirth: string;

    @OneToOne(() => UserAuth, (userAuth) => userAuth.user)
    @Field(() => UserAuth)
    userAuth: UserAuth;

    @OneToMany(() => BookReview, (bookReview) => bookReview.user)
    reviews: BookReview[];
}
