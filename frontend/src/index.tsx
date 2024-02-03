import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
