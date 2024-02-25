import React from 'react';
import { createRoot } from 'react-dom/client';
import { makeApolloClient } from 'app/core/GraphQL';
import { ApolloProvider } from '@apollo/client';

import { RouterProvider } from 'app/core/Navigation/RouterProvider';

const MOUNT_NODE = document.getElementById('root') as HTMLElement;
const root = createRoot(MOUNT_NODE);

const apolloClient = makeApolloClient();

root.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <RouterProvider />
        </ApolloProvider>
    </React.StrictMode>,
);
