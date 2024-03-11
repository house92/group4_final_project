import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import * as Joi from 'joi';
import {
    ConnectionArgs,
    ConnectionBuilderOptions,
    Cursor,
    OffsetCursorParameters,
    OffsetPaginatedConnectionBuilder,
    PageInfo,
    createConnectionType,
    createEdgeType,
    validateParamsUsingSchema,
} from 'nestjs-graphql-connection';
import { Book } from '../book.entity';
import { ListBooksFilter } from '../inputs/list-books.input';

@ObjectType()
export class BookEdge extends createEdgeType(Book) {}

@ObjectType()
export class BookConnection extends createConnectionType(BookEdge) {}

@ArgsType()
export class BookConnectionArgs extends ConnectionArgs {
    /*
     * BookConnectionArgs will inherit `first`, `last`, `before`, `after`, and `page` fields from ConnectionArgs
     */
    //EXAMPLE: Defining a custom argument for filtering
    @Field(() => ListBooksFilter, { nullable: true })
    public filter?: ListBooksFilter;
}

export type BookCursorParams = OffsetCursorParameters & { title?: string };

export type BookCursor = Cursor<BookCursorParams>;

export class BookConnectionBuilder extends OffsetPaginatedConnectionBuilder<
    BookConnection,
    BookConnectionArgs,
    BookEdge,
    Book
> {
    public title?: string;

    public constructor(connectionArgs: BookConnectionArgs | undefined, options: ConnectionBuilderOptions = {}) {
        super(connectionArgs, options);

        const { title } = connectionArgs?.filter ?? {};

        if (title) {
            this.title = title;
        }
    }

    public createConnection(fields: { edges: BookEdge[]; pageInfo: PageInfo }): BookConnection {
        return new BookConnection(fields);
    }

    public createEdge(fields: { node: Book; cursor: string }): BookEdge {
        return new BookEdge(fields);
    }

    public createCursor(node: Book, index: number): BookCursor {
        const { title } = this.connectionArgs?.filter ?? {};

        const cursor: BookCursor = new Cursor({ offset: this.startOffset + index });

        if (title) {
            cursor.parameters.title = title;
        }

        return cursor;
    }

    public decodeCursor(encodedString: string): BookCursor {
        return Cursor.fromString(encodedString, (params) =>
            validateParamsUsingSchema(
                params,
                Joi.object({
                    offset: Joi.number().integer().min(0).empty('').required(),
                    title: Joi.string().optional(),
                }).unknown(false),
            ),
        );
    }
}
