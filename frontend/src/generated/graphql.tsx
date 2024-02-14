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
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Author = {
  __typename?: 'Author';
  /** Bio of author */
  bio?: Maybe<Scalars['String']['output']>;
  books: Array<Book>;
  /** Author year of death */
  dateOfBirth: Scalars['String']['output'];
  /** Author year of death */
  dateOfDeath?: Maybe<Scalars['String']['output']>;
  /** Author first name */
  firstName?: Maybe<Scalars['String']['output']>;
  /** Author hometown */
  hometown?: Maybe<Scalars['String']['output']>;
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
  publicationDate?: InputMaybe<Scalars['String']['input']>;
  /** URL to a page where the book can be purchased */
  purchaseUrl?: InputMaybe<Scalars['String']['input']>;
  /** Synopsis of the book */
  synopsis?: InputMaybe<Scalars['String']['input']>;
  /** Title of the book */
  title: Scalars['String']['input'];
};

export type CreateUserAuthInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  userAuthId: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAuthor: Author;
  createBook: Book;
  createUser: User;
  registerUser: UserSession;
  removeAuthor: Author;
  removeBook: Book;
  removeUser: User;
  signInUser: UserSession;
  updateAuthor: Author;
  updateBook: Book;
  updateUser: User;
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


export type MutationRegisterUserArgs = {
  input: CreateUserAuthInput;
};


export type MutationRemoveAuthorArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveBookArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
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


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getAuthor: Author;
  getBook: Book;
  getUser: User;
  getUserSession: UserSession;
  listAuthors: Array<Author>;
  listBooks: Array<Book>;
  listUsers: Array<User>;
};


export type QueryGetAuthorArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetBookArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
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

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  dateOfBirth: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  userAuth: UserAuth;
};

export type UserAuth = {
  __typename?: 'UserAuth';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  user: User;
};

export type UserSession = {
  __typename?: 'UserSession';
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type GetUserSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserSessionQuery = { __typename?: 'Query', getUserSession: { __typename?: 'UserSession', id: string, firstName: string, lastName: string } };

export type GetAuthorsListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthorsListQuery = { __typename?: 'Query', listAuthors: Array<{ __typename?: 'Author', id: string, firstName?: string | null, lastName: string, dateOfBirth: string, dateOfDeath?: string | null, hometown?: string | null, bio?: string | null }> };

export type GetAuthorByIdQueryVariables = Exact<{
  authorId: Scalars['String']['input'];
}>;


export type GetAuthorByIdQuery = { __typename?: 'Query', getAuthor: { __typename?: 'Author', id: string, firstName?: string | null, lastName: string, dateOfBirth: string, dateOfDeath?: string | null, hometown?: string | null, bio?: string | null } };

export type GetBooksListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBooksListQuery = { __typename?: 'Query', listBooks: Array<{ __typename?: 'Book', coverImage: string, title: string, publicationDate?: string | null, authors: Array<{ __typename?: 'Author', firstName?: string | null, lastName: string }> }> };


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
export function useGetUserSessionQuery(baseOptions?: Apollo.QueryHookOptions<GetUserSessionQuery, GetUserSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserSessionQuery, GetUserSessionQueryVariables>(GetUserSessionDocument, options);
      }
export function useGetUserSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserSessionQuery, GetUserSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserSessionQuery, GetUserSessionQueryVariables>(GetUserSessionDocument, options);
        }
export function useGetUserSessionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserSessionQuery, GetUserSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
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
export function useGetAuthorsListQuery(baseOptions?: Apollo.QueryHookOptions<GetAuthorsListQuery, GetAuthorsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthorsListQuery, GetAuthorsListQueryVariables>(GetAuthorsListDocument, options);
      }
export function useGetAuthorsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthorsListQuery, GetAuthorsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthorsListQuery, GetAuthorsListQueryVariables>(GetAuthorsListDocument, options);
        }
export function useGetAuthorsListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAuthorsListQuery, GetAuthorsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAuthorsListQuery, GetAuthorsListQueryVariables>(GetAuthorsListDocument, options);
        }
export type GetAuthorsListQueryHookResult = ReturnType<typeof useGetAuthorsListQuery>;
export type GetAuthorsListLazyQueryHookResult = ReturnType<typeof useGetAuthorsListLazyQuery>;
export type GetAuthorsListSuspenseQueryHookResult = ReturnType<typeof useGetAuthorsListSuspenseQuery>;
export type GetAuthorsListQueryResult = Apollo.QueryResult<GetAuthorsListQuery, GetAuthorsListQueryVariables>;
export const GetAuthorByIdDocument = gql`
    query GetAuthorById($authorId: String!) {
  getAuthor(id: $authorId) {
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
 * __useGetAuthorByIdQuery__
 *
 * To run a query within a React component, call `useGetAuthorByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorByIdQuery({
 *   variables: {
 *      authorId: // value for 'authorId'
 *   },
 * });
 */
export function useGetAuthorByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAuthorByIdQuery, GetAuthorByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthorByIdQuery, GetAuthorByIdQueryVariables>(GetAuthorByIdDocument, options);
      }
export function useGetAuthorByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthorByIdQuery, GetAuthorByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthorByIdQuery, GetAuthorByIdQueryVariables>(GetAuthorByIdDocument, options);
        }
export function useGetAuthorByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAuthorByIdQuery, GetAuthorByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAuthorByIdQuery, GetAuthorByIdQueryVariables>(GetAuthorByIdDocument, options);
        }
export type GetAuthorByIdQueryHookResult = ReturnType<typeof useGetAuthorByIdQuery>;
export type GetAuthorByIdLazyQueryHookResult = ReturnType<typeof useGetAuthorByIdLazyQuery>;
export type GetAuthorByIdSuspenseQueryHookResult = ReturnType<typeof useGetAuthorByIdSuspenseQuery>;
export type GetAuthorByIdQueryResult = Apollo.QueryResult<GetAuthorByIdQuery, GetAuthorByIdQueryVariables>;
export const GetBooksListDocument = gql`
    query GetBooksList {
  listBooks {
    coverImage
    title
    authors {
      firstName
      lastName
    }
    publicationDate
  }
}
    `;

/**
 * __useGetBooksListQuery__
 *
 * To run a query within a React component, call `useGetBooksListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBooksListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBooksListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBooksListQuery(baseOptions?: Apollo.QueryHookOptions<GetBooksListQuery, GetBooksListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBooksListQuery, GetBooksListQueryVariables>(GetBooksListDocument, options);
      }
export function useGetBooksListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBooksListQuery, GetBooksListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBooksListQuery, GetBooksListQueryVariables>(GetBooksListDocument, options);
        }
export function useGetBooksListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBooksListQuery, GetBooksListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBooksListQuery, GetBooksListQueryVariables>(GetBooksListDocument, options);
        }
export type GetBooksListQueryHookResult = ReturnType<typeof useGetBooksListQuery>;
export type GetBooksListLazyQueryHookResult = ReturnType<typeof useGetBooksListLazyQuery>;
export type GetBooksListSuspenseQueryHookResult = ReturnType<typeof useGetBooksListSuspenseQuery>;
export type GetBooksListQueryResult = Apollo.QueryResult<GetBooksListQuery, GetBooksListQueryVariables>;