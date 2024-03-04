import { ArgsType, ObjectType } from '@nestjs/graphql';
import {
    ConnectionArgs,
    OffsetPaginatedConnectionBuilder,
    PageInfo,
    createConnectionType,
    createEdgeType,
} from 'nestjs-graphql-connection';
import { Book } from '../book.entity';

@ObjectType()
export class BookEdge extends createEdgeType(Book) {}

@ObjectType()
export class BookConnection extends createConnectionType(BookEdge) {}

@ArgsType()
export class BookConnectionArgs extends ConnectionArgs {
    /*
     * BookConnectionArgs will inherit `first`, `last`, `before`, `after`, and `page` fields from ConnectionArgs
     */
    // EXAMPLE: Defining a custom argument for filtering
    // @Field((type) => String, { nullable: true })
    // public title?: string;
}

export class BookConnectionBuilder extends OffsetPaginatedConnectionBuilder<
    BookConnection,
    BookConnectionArgs,
    BookEdge,
    Book
> {
    public createConnection(fields: { edges: BookEdge[]; pageInfo: PageInfo }): BookConnection {
        return new BookConnection(fields);
    }

    public createEdge(fields: { node: Book; cursor: string }): BookEdge {
        return new BookEdge(fields);
    }

    // When extending from OffsetPaginatedConnectionBuilder, cursor encoding/decoding always uses the OffsetCursor type.
    // So it's not necessary to implement the createCursor() or decodeCursor() methods here.
}
