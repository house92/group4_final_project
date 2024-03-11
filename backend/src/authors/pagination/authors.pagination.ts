import { ArgsType, ObjectType } from '@nestjs/graphql';
import {
    ConnectionArgs,
    OffsetPaginatedConnectionBuilder,
    PageInfo,
    createConnectionType,
    createEdgeType,
} from 'nestjs-graphql-connection';
import { Author } from '../author.entity';

@ObjectType()
export class AuthorEdge extends createEdgeType(Author) {}

@ObjectType()
export class AuthorConnection extends createConnectionType(AuthorEdge) {}

@ArgsType()
export class AuthorConnectionArgs extends ConnectionArgs {
    /*
     * AuthorConnectionArgs will inherit `first`, `last`, `before`, `after`, and `page` fields from ConnectionArgs
     */
    // EXAMPLE: Defining a custom argument for filtering
    // @Field((type) => String, { nullable: true })
    // public title?: string;
}

export class AuthorConnectionBuilder extends OffsetPaginatedConnectionBuilder<
    AuthorConnection,
    AuthorConnectionArgs,
    AuthorEdge,
    Author
> {
    public createConnection(fields: { edges: AuthorEdge[]; pageInfo: PageInfo }): AuthorConnection {
        return new AuthorConnection(fields);
    }

    public createEdge(fields: { node: Author; cursor: string }): AuthorEdge {
        return new AuthorEdge(fields);
    }

    // When extending from OffsetPaginatedConnectionBuilder, cursor encoding/decoding always uses the OffsetCursor type.
    // So it's not necessary to implement the createCursor() or decodeCursor() methods here.
}
