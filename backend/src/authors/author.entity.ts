import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Book } from 'src/books/book.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Author {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ nullable: true })
    @Field(() => String, { description: 'Author first name', nullable: true })
    firstName?: string;

    @Column()
    @Field(() => String, { description: 'Author last name' })
    lastName: string;

    @Column()
    @Field(() => String, { description: 'Author year of birth' })
    dateOfBirth: string;

    @Column({ nullable: true, type: 'timestamptz' })
    @Field(() => Date, { description: 'Author year of death', nullable: true })
    dateOfDeath?: Date;

    @Column({ nullable: true })
    @Field(() => String, { description: 'Author hometown', nullable: true })
    hometown?: string;

    @Column({ nullable: true })
    @Field(() => String, { description: 'Bio of author', nullable: true })
    bio?: string;

    @ManyToMany(() => Book, { cascade: true })
    @JoinTable({
        name: 'author_books',
        joinColumn: { name: 'author_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'book_id', referencedColumnName: 'id' },
    })
    @Field(() => [Book])
    books?: Book[];
}
