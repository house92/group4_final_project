import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
};

export type Author = {
    __typename?: 'Author';
    /** Bio of author */
    bio: Scalars['String']['output'];
    books: Array<Book>;
    /** Author year of death */
    dateOfBirth: Scalars['String']['output'];
    /** Author year of death */
    dateOfDeath: Scalars['String']['output'];
    /** Author first name */
    firstName: Scalars['String']['output'];
    /** Author hometown */
    hometown: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    /** Author last name */
    lastName: Scalars['String']['output'];
};

export type Book = {
    __typename?: 'Book';
    authors: Array<Author>;
    /** URL to the book cover */
    coverImage: Scalars['String']['output'];
    /** URL to a free download of the book */
    downloadUrl?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    /** ISBN 13 */
    isbn?: Maybe<Scalars['String']['output']>;
    /** Date as ISO string */
    publicationDate?: Maybe<Scalars['String']['output']>;
    /** URL to a page where the book can be purchased */
    purchaseUrl?: Maybe<Scalars['String']['output']>;
    /** Synopsis of the book */
    synopsis?: Maybe<Scalars['String']['output']>;
    /** Title of the book */
    title: Scalars['String']['output'];
};

export type CreateAuthorInput = {
    /** Biography of author */
    bio?: InputMaybe<Scalars['String']['input']>;
    bookIds?: InputMaybe<Array<Scalars['ID']['input']>>;
    /** Author year of death */
    dateOfBirth: Scalars['String']['input'];
    /** Author year of death */
    dateOfDeath?: InputMaybe<Scalars['String']['input']>;
    /** Author first name */
    firstName: Scalars['String']['input'];
    /** Author hometown */
    hometown?: InputMaybe<Scalars['String']['input']>;
    /** Author last name */
    lastName: Scalars['String']['input'];
};

export type CreateBookInput = {
    authorIds?: InputMaybe<Array<Scalars['ID']['input']>>;
    /** URL to the book cover */
    coverImage: Scalars['String']['input'];
    /** URL to a free download of the book */
    downloadUrl?: InputMaybe<Scalars['String']['input']>;
    /** ISBN 13 */
    isbn?: InputMaybe<Scalars['String']['input']>;
    /** Date as ISO string */
    publicationDate: Scalars['String']['input'];
    /** URL to a page where the book can be purchased */
    purchaseUrl?: InputMaybe<Scalars['String']['input']>;
    /** Synopsis of the book */
    synopsis?: InputMaybe<Scalars['String']['input']>;
    /** Title of the book */
    title: Scalars['String']['input'];
};

export type CreateUserInput = {
    email: Scalars['String']['input'];
    firstName: Scalars['String']['input'];
    lastName: Scalars['String']['input'];
    password: Scalars['String']['input'];
};

export type Mutation = {
    __typename?: 'Mutation';
    createAuthor: Author;
    createBook: Book;
    createUser: User;
    removeAuthor: Author;
    removeBook: Book;
    signInUser: UserSession;
    updateAuthor: Author;
    updateBook: Book;
};

export type MutationCreateAuthorArgs = {
    input: CreateAuthorInput;
};

export type MutationCreateBookArgs = {
    input: CreateBookInput;
};

export type MutationCreateUserArgs = {
    input: CreateUserInput;
};

export type MutationRemoveAuthorArgs = {
    id: Scalars['String']['input'];
};

export type MutationRemoveBookArgs = {
    id: Scalars['Int']['input'];
};

export type MutationSignInUserArgs = {
    email: Scalars['String']['input'];
    password: Scalars['String']['input'];
};

export type MutationUpdateAuthorArgs = {
    input: UpdateAuthorInput;
};

export type MutationUpdateBookArgs = {
    input: UpdateBookInput;
};

export type Query = {
    __typename?: 'Query';
    getAllEmails: Array<Scalars['String']['output']>;
    getAuthor: Author;
    getBook: Book;
    getUserSession: UserSession;
    listAuthors: Array<Author>;
    listBooks: Array<Book>;
};

export type QueryGetAuthorArgs = {
    id: Scalars['String']['input'];
};

export type QueryGetBookArgs = {
    id: Scalars['String']['input'];
};

export type UpdateAuthorInput = {
    /** Biography of author */
    bio?: InputMaybe<Scalars['String']['input']>;
    bookIds?: InputMaybe<Array<Scalars['ID']['input']>>;
    /** Author year of death */
    dateOfBirth?: InputMaybe<Scalars['String']['input']>;
    /** Author year of death */
    dateOfDeath?: InputMaybe<Scalars['String']['input']>;
    /** Author first name */
    firstName?: InputMaybe<Scalars['String']['input']>;
    /** Author hometown */
    hometown?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['String']['input'];
    /** Author last name */
    lastName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBookInput = {
    authorIds?: InputMaybe<Array<Scalars['ID']['input']>>;
    /** URL to the book cover */
    coverImage?: InputMaybe<Scalars['String']['input']>;
    /** URL to a free download of the book */
    downloadUrl?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['Int']['input'];
    /** ISBN 13 */
    isbn?: InputMaybe<Scalars['String']['input']>;
    /** Date as ISO string */
    publicationDate?: InputMaybe<Scalars['String']['input']>;
    /** URL to a page where the book can be purchased */
    purchaseUrl?: InputMaybe<Scalars['String']['input']>;
    /** Synopsis of the book */
    synopsis?: InputMaybe<Scalars['String']['input']>;
    /** Title of the book */
    title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
    __typename?: 'User';
    email: Scalars['String']['output'];
    firstName: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    lastName: Scalars['String']['output'];
};

export type UserSession = {
    __typename?: 'UserSession';
    firstName: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    lastName: Scalars['String']['output'];
    token?: Maybe<Scalars['String']['output']>;
};

export type GetUserSessionQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserSessionQuery = {
    __typename?: 'Query';
    getUserSession: { __typename?: 'UserSession'; id: string; firstName: string; lastName: string };
};

export type GetAuthorsListQueryVariables = Exact<{ [key: string]: never }>;

export type GetAuthorsListQuery = {
    __typename?: 'Query';
    listAuthors: Array<{
        __typename?: 'Author';
        id: string;
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        dateOfDeath: string;
        hometown: string;
        bio: string;
    }>;
};

export const GetUserSessionDocument = gql`
    query GetUserSession {
        getUserSession {
            id
            firstName
            lastName
        }
    }
`;

/**
 * __useGetUserSessionQuery__
 *
 * To run a query within a React component, call `useGetUserSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserSessionQuery(
    baseOptions?: Apollo.QueryHookOptions<GetUserSessionQuery, GetUserSessionQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetUserSessionQuery, GetUserSessionQueryVariables>(GetUserSessionDocument, options);
}
export function useGetUserSessionLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<GetUserSessionQuery, GetUserSessionQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<GetUserSessionQuery, GetUserSessionQueryVariables>(GetUserSessionDocument, options);
}
export function useGetUserSessionSuspenseQuery(
    baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserSessionQuery, GetUserSessionQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery<GetUserSessionQuery, GetUserSessionQueryVariables>(GetUserSessionDocument, options);
}
export type GetUserSessionQueryHookResult = ReturnType<typeof useGetUserSessionQuery>;
export type GetUserSessionLazyQueryHookResult = ReturnType<typeof useGetUserSessionLazyQuery>;
export type GetUserSessionSuspenseQueryHookResult = ReturnType<typeof useGetUserSessionSuspenseQuery>;
export type GetUserSessionQueryResult = Apollo.QueryResult<GetUserSessionQuery, GetUserSessionQueryVariables>;
export const GetAuthorsListDocument = gql`
    query GetAuthorsList {
        listAuthors {
            id
            firstName
            lastName
            dateOfBirth
            dateOfDeath
            hometown
            bio
        }
    }
`;



/**
 * __useGetAuthorsListQuery__
 *
 * To run a query within a React component, call `useGetAuthorsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAuthorsListQuery(
    baseOptions?: Apollo.QueryHookOptions<GetAuthorsListQuery, GetAuthorsListQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetAuthorsListQuery, GetAuthorsListQueryVariables>(GetAuthorsListDocument, options);
}
export function useGetAuthorsListLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<GetAuthorsListQuery, GetAuthorsListQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<GetAuthorsListQuery, GetAuthorsListQueryVariables>(GetAuthorsListDocument, options);
}
export function useGetAuthorsListSuspenseQuery(
    baseOptions?: Apollo.SuspenseQueryHookOptions<GetAuthorsListQuery, GetAuthorsListQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery<GetAuthorsListQuery, GetAuthorsListQueryVariables>(GetAuthorsListDocument, options);
}
export type GetAuthorsListQueryHookResult = ReturnType<typeof useGetAuthorsListQuery>;
export type GetAuthorsListLazyQueryHookResult = ReturnType<typeof useGetAuthorsListLazyQuery>;
export type GetAuthorsListSuspenseQueryHookResult = ReturnType<typeof useGetAuthorsListSuspenseQuery>;
export type GetAuthorsListQueryResult = Apollo.QueryResult<GetAuthorsListQuery, GetAuthorsListQueryVariables>;
