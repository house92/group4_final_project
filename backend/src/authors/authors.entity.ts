import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Book } from 'src/books/book.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Author {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field(() => String, { description: 'Author first name' })
    firstName: string;

    @Column()
    @Field(() => String, { description: 'Author last name' })
    lastName: string;

    @Column({ nullable: true })
    @Field(() => String, { description: 'Author year of death' })
    dateOfBirth: string;

    @Column()
    @Field(() => String, { description: 'Author year of death' })
    dateOfDeath: string;

    @Column()
    @Field(() => String, { description: 'Author hometown' })
    hometown: string;

    @Column({ nullable: true })
    @Field(() => String, { description: 'Bio of author' })
    bio: string;

    @ManyToMany(() => Book, book => book.authors)
    @JoinTable()
    books: Book[];
}