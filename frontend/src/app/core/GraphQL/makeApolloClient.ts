import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { getGQLOrigin } from '../../../environment';

export default function makeApolloClient() {
    const httpLink = createHttpLink({
        uri: `${getGQLOrigin()}/graphql`,
        credentials: 'include',
    });

    console.log(getGQLOrigin());
    console.log(httpLink);

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
            },
        };
    });

    const client = new ApolloClient({
        defaultOptions: {
            watchQuery: {
                initialFetchPolicy: 'network-only',
                fetchPolicy: 'cache-and-network',
                nextFetchPolicy: 'cache-first',
            },
        },
        cache: new InMemoryCache(),
        link: from([authLink, httpLink]),
    });

    return client;
}
