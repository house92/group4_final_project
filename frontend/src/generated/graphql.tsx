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

export type CreateUserInput = {
    email: Scalars['String']['input'];
    firstName: Scalars['String']['input'];
    lastName: Scalars['String']['input'];
    password: Scalars['String']['input'];
};

export type Mutation = {
    __typename?: 'Mutation';
    createUser: User;
    signInUser: UserSession;
};

export type MutationCreateUserArgs = {
    input: CreateUserInput;
};

export type MutationSignInUserArgs = {
    email: Scalars['String']['input'];
    password: Scalars['String']['input'];
};

export type Query = {
    __typename?: 'Query';
    getAllEmails: Array<Scalars['String']['output']>;
    getUserSession: UserSession;
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
