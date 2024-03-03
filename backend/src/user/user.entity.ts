import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserAuth } from 'src/user-auth/user-auth.entity';
import { PrimaryGeneratedColumn, Column, OneToOne, OneToMany, Entity, ManyToMany, JoinTable } from 'typeorm';
import { BookReview } from 'src/bookreviews/bookreview.entity';
import { userInfo } from 'os';

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
    @Field(() => Date, { description: 'Author year of death' })
    dateOfBirth: Date;

    @OneToOne(() => UserAuth, (userAuth) => userAuth.user)
    @Field(() => UserAuth)
    userAuth: UserAuth;

    @OneToMany(() => BookReview, (bookReview) => bookReview.user)
    @Field(() => [BookReview], { nullable: true })
    bookReviews?: BookReview[];

    @ManyToMany(() => User)
    @JoinTable({
        name: 'friends',
        joinColumn: { name: 'user_1_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_2_id', referencedColumnName: 'id' },
    })
    @Field(() => [User], { nullable: true })
    friends?: User[];

    /* @OneToMany(() => User, (user) => user.isFriendInvited)
    @Field(() => [User], { nullable: true })
    receivedInvites?: User[]; */

    // @OneToMany(() => Friend, (friend) => friend.user)
    // friends?: User[];

    //changes
    // @ManyToMany(() => User)
    // @JoinTable({
    //     name: 'invited friend',
    //     joinColumn: {
    //         name: 'isUser',
    //         referencedColumnName: 'id',
    //         name: 'invitedUser',
    //         referencedColumnName: 'friends',
    //     },
    // })
    // @Field(() => [User], { nullable: true })
    // invitedFriend?: User[];
}
