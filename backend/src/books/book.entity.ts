import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ nullable: true })
    @Field(() => String, { description: 'ISBN 13', nullable: true })
    isbn?: string;

    @Column()
    @Field(() => String, { description: 'Title of the book' })
    title: string;

    @Column({ name: 'publication_date', type: 'timestamptz', nullable: true })
    @Field(() => String, { description: 'Date as ISO string', nullable: true })
    publicationDate?: Date;

    @Column({ nullable: true })
    @Field(() => String, { description: 'Synopsis of the book', nullable: true })
    synopsis?: string;

    @Column({ name: 'cover_image' })
    @Field(() => String, { description: 'URL to the book cover' })
    coverImage: string;

    @Column({ nullable: true })
    @Field(() => String, { description: 'URL to a free download of the book', nullable: true })
    downloadUrl?: string;

    @Column({ nullable: true })
    @Field(() => String, { description: 'URL to a page where the book can be purchased', nullable: true })
    purchaseUrl?: string;
}
