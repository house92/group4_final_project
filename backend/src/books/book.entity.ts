import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field(() => String, { description: 'Title of the book' })
    title: string;

    @Column({ name: 'publication_date' })
    @Field(() => String, { description: 'Date as ISO string' })
    publicationDate: string;

    @Column()
    @Field(() => String, { description: 'Synopsis of the book' })
    synopsis: string;

    @Column({ name: 'cover_image' })
    @Field(() => String, { description: 'URL to the book cover' })
    coverImage: string;
}
