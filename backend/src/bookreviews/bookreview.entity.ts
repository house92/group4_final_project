import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Book } from 'src/books/book.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class BookReview {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ name: 'creation_date', type: 'timestamptz' })
    @Field(() => String, { description: 'Date as ISO string' })
    creationDate: Date;

    @Column({ name: 'last_updated', type: 'timestamptz' })
    @Field(() => String, { description: 'Date as ISO string' })
    lastUpdated: Date;

    @Column({ name: 'body' })
    @Field(() => String, { description: 'review body text' })
    body: string;

    @Column({ name: 'rating' })
    @Field(() => Number, { description: 'Book Rating' })
    rating: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
    @Field(() => User)
    user: User;

    @ManyToOne(() => Book)
    @JoinColumn({ name: 'book_id', referencedColumnName: 'id'})
    @Field(() => Book)
    book: Book;

}
