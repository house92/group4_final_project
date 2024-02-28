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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string; }
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
  bookReviews: Array<BookReview>;
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

export type BookReview = {
  __typename?: 'BookReview';
  /** review body text */
  body: Scalars['String']['output'];
  book: Book;
  /** Date as ISO string */
  creationDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Date as ISO string */
  lastUpdated: Scalars['String']['output'];
  /** Book Rating */
  rating: Scalars['Float']['output'];
  user: User;
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

export type CreateBookReviewInput = {
  /** Body of the review */
  body: Scalars['String']['input'];
  /** Id of the book being reviewed */
  bookId: Scalars['String']['input'];
  /** Rating tied to review */
  rating: Scalars['Float']['input'];
  /** Id of the reviewer */
  userId: Scalars['String']['input'];
};

export type CreateUserAuthInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFriend: User;
  createAuthor: Author;
  createBook: Book;
  createBookReview: BookReview;
  registerUser: UserSession;
  removeAuthor: Author;
  removeBook: Book;
  removeBookReview: Book;
  removeUser: User;
  signInUser: UserSession;
  updateAuthor: Author;
  updateBook: Book;
  updateUser: User;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['String']['input'];
};


export type MutationCreateAuthorArgs = {
  input: CreateAuthorInput;
};


export type MutationCreateBookArgs = {
  input: CreateBookInput;
};


export type MutationCreateBookReviewArgs = {
  input: CreateBookReviewInput;
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


export type MutationRemoveBookReviewArgs = {
  id: Scalars['String']['input'];
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
  getReviewByUser: BookReview;
  getUser: User;
  getUserSession: UserSession;
  listAllReviews: Array<BookReview>;
  listAuthors: Array<Author>;
  listBooks: Array<Book>;
  listReviewsByBook: Array<BookReview>;
  listReviewsByUser: Array<BookReview>;
  listUsers: Array<User>;
};


export type QueryGetAuthorArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetBookArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetReviewByUserArgs = {
  bookId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryListReviewsByBookArgs = {
  id: Scalars['String']['input'];
};


export type QueryListReviewsByUserArgs = {
  userId: Scalars['String']['input'];
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
  bookReviews?: Maybe<Array<BookReview>>;
  /** Author year of death */
  dateOfBirth: Scalars['DateTime']['output'];
  firstName: Scalars['String']['output'];
  friends?: Maybe<Array<User>>;
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
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

export type GetUserSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserSessionQuery = { __typename?: 'Query', getUserSession: { __typename?: 'UserSession', id: string, firstName?: string | null, lastName?: string | null } };

export type GetAuthorsListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthorsListQuery = { __typename?: 'Query', listAuthors: Array<{ __typename?: 'Author', id: string, firstName?: string | null, lastName: string, dateOfBirth: string, dateOfDeath?: string | null, hometown?: string | null, bio?: string | null }> };

export type GetAuthorByIdQueryVariables = Exact<{
  authorId: Scalars['String']['input'];
}>;


export type GetAuthorByIdQuery = { __typename?: 'Query', getAuthor: { __typename?: 'Author', id: string, firstName?: string | null, lastName: string, dateOfBirth: string, dateOfDeath?: string | null, hometown?: string | null, bio?: string | null } };

export type GetBooksListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBooksListQuery = { __typename?: 'Query', listBooks: Array<{ __typename?: 'Book', id: string, coverImage: string, title: string, publicationDate?: string | null, authors: Array<{ __typename?: 'Author', firstName?: string | null, lastName: string }> }> };

export type GetBookByIdQueryVariables = Exact<{
  bookId: Scalars['String']['input'];
}>;


export type GetBookByIdQuery = { __typename?: 'Query', getBook: { __typename?: 'Book', id: string, title: string, coverImage: string, publicationDate?: string | null, synopsis?: string | null, authors: Array<{ __typename?: 'Author', id: string, firstName?: string | null, lastName: string }>, bookReviews: Array<{ __typename?: 'BookReview', id: string, body: string, rating: number, user: { __typename?: 'User', id: string, firstName: string, lastName: string } }> } };

export type CreateBookReviewMutationVariables = Exact<{
  input: CreateBookReviewInput;
}>;


export type CreateBookReviewMutation = { __typename?: 'Mutation', createBookReview: { __typename?: 'BookReview', id: string, body: string, rating: number } };

export type GetUserFriendsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserFriendsQuery = { __typename?: 'Query', getUser: { __typename?: 'User', friends?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string }> | null } };

export type SignInUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInUserMutation = { __typename?: 'Mutation', signInUser: { __typename?: 'UserSession', id: string, firstName?: string | null, lastName?: string | null } };

export type GetUserByIdQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, firstName: string, lastName: string, bio?: string | null, dateOfBirth: string, bookReviews?: Array<{ __typename?: 'BookReview', id: string, body: string, rating: number, book: { __typename?: 'Book', id: string, title: string } }> | null } };


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
    id
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
export const GetBookByIdDocument = gql`
    query GetBookById($bookId: String!) {
  getBook(id: $bookId) {
    id
    title
    coverImage
    authors {
      id
      firstName
      lastName
    }
    publicationDate
    synopsis
    bookReviews {
      id
      body
      rating
      user {
        id
        firstName
        lastName
      }
    }
  }
}
    `;

/**
 * __useGetBookByIdQuery__
 *
 * To run a query within a React component, call `useGetBookByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookByIdQuery({
 *   variables: {
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useGetBookByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBookByIdQuery, GetBookByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookByIdQuery, GetBookByIdQueryVariables>(GetBookByIdDocument, options);
      }
export function useGetBookByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookByIdQuery, GetBookByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookByIdQuery, GetBookByIdQueryVariables>(GetBookByIdDocument, options);
        }
export function useGetBookByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBookByIdQuery, GetBookByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBookByIdQuery, GetBookByIdQueryVariables>(GetBookByIdDocument, options);
        }
export type GetBookByIdQueryHookResult = ReturnType<typeof useGetBookByIdQuery>;
export type GetBookByIdLazyQueryHookResult = ReturnType<typeof useGetBookByIdLazyQuery>;
export type GetBookByIdSuspenseQueryHookResult = ReturnType<typeof useGetBookByIdSuspenseQuery>;
export type GetBookByIdQueryResult = Apollo.QueryResult<GetBookByIdQuery, GetBookByIdQueryVariables>;
export const CreateBookReviewDocument = gql`
    mutation CreateBookReview($input: CreateBookReviewInput!) {
  createBookReview(input: $input) {
    id
    body
    rating
  }
}
    `;
export type CreateBookReviewMutationFn = Apollo.MutationFunction<CreateBookReviewMutation, CreateBookReviewMutationVariables>;

/**
 * __useCreateBookReviewMutation__
 *
 * To run a mutation, you first call `useCreateBookReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookReviewMutation, { data, loading, error }] = useCreateBookReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookReviewMutation, CreateBookReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookReviewMutation, CreateBookReviewMutationVariables>(CreateBookReviewDocument, options);
      }
export type CreateBookReviewMutationHookResult = ReturnType<typeof useCreateBookReviewMutation>;
export type CreateBookReviewMutationResult = Apollo.MutationResult<CreateBookReviewMutation>;
export type CreateBookReviewMutationOptions = Apollo.BaseMutationOptions<CreateBookReviewMutation, CreateBookReviewMutationVariables>;
export const GetUserFriendsDocument = gql`
    query GetUserFriends($userId: String!) {
  getUser(id: $userId) {
    friends {
      id
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useGetUserFriendsQuery__
 *
 * To run a query within a React component, call `useGetUserFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFriendsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserFriendsQuery(baseOptions: Apollo.QueryHookOptions<GetUserFriendsQuery, GetUserFriendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFriendsQuery, GetUserFriendsQueryVariables>(GetUserFriendsDocument, options);
      }
export function useGetUserFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFriendsQuery, GetUserFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFriendsQuery, GetUserFriendsQueryVariables>(GetUserFriendsDocument, options);
        }
export function useGetUserFriendsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserFriendsQuery, GetUserFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserFriendsQuery, GetUserFriendsQueryVariables>(GetUserFriendsDocument, options);
        }
export type GetUserFriendsQueryHookResult = ReturnType<typeof useGetUserFriendsQuery>;
export type GetUserFriendsLazyQueryHookResult = ReturnType<typeof useGetUserFriendsLazyQuery>;
export type GetUserFriendsSuspenseQueryHookResult = ReturnType<typeof useGetUserFriendsSuspenseQuery>;
export type GetUserFriendsQueryResult = Apollo.QueryResult<GetUserFriendsQuery, GetUserFriendsQueryVariables>;
export const SignInUserDocument = gql`
    mutation SignInUser($email: String!, $password: String!) {
  signInUser(email: $email, password: $password) {
    id
    firstName
    lastName
  }
}
    `;
export type SignInUserMutationFn = Apollo.MutationFunction<SignInUserMutation, SignInUserMutationVariables>;

/**
 * __useSignInUserMutation__
 *
 * To run a mutation, you first call `useSignInUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInUserMutation, { data, loading, error }] = useSignInUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInUserMutation(baseOptions?: Apollo.MutationHookOptions<SignInUserMutation, SignInUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInUserMutation, SignInUserMutationVariables>(SignInUserDocument, options);
      }
export type SignInUserMutationHookResult = ReturnType<typeof useSignInUserMutation>;
export type SignInUserMutationResult = Apollo.MutationResult<SignInUserMutation>;
export type SignInUserMutationOptions = Apollo.BaseMutationOptions<SignInUserMutation, SignInUserMutationVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($userId: String!) {
  getUser(id: $userId) {
    id
    firstName
    lastName
    bio
    dateOfBirth
    bookReviews {
      id
      body
      rating
      book {
        id
        title
      }
    }
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;