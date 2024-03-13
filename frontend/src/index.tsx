import React from 'react';
import { createRoot } from 'react-dom/client';
import { makeApolloClient } from 'app/core/GraphQL';
import { ApolloProvider } from '@apollo/client';

import { RouterProvider } from 'app/core/Navigation/RouterProvider';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'app/core/Theme';

const MOUNT_NODE = document.getElementById('root') as HTMLElement;
const root = createRoot(MOUNT_NODE);

const apolloClient = makeApolloClient();

root.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <RouterProvider />
            </ThemeProvider>
        </ApolloProvider>
    </React.StrictMode>,
);
