import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
    @Field(() => String, { description: 'ISBN 13', nullable: true })
    isbn?: string;

    @Field(() => String, { description: 'Title of the book' })
    title: string;

    @Field(() => String, { description: 'Date as ISO string', nullable: true })
    publicationDate?: Date;

    @Field(() => String, { description: 'Synopsis of the book', nullable: true })
    synopsis?: string;

    @Field(() => String, { description: 'URL to the book cover' })
    coverImage: string;

    @Field(() => String, { description: 'URL to a free download of the book', nullable: true })
    downloadUrl?: string;

    @Field(() => String, { description: 'URL to a page where the book can be purchased', nullable: true })
    purchaseUrl?: string;

    @Field(() => [ID], { nullable: true })
    authorIds?: string[];
}
