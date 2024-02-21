import { createBrowserRouter } from 'react-router-dom';
import { AuthorIndexPage, AuthorPage, BookIndexPage, UserPage } from 'app/pages';
import { Layout } from 'app/components';

export function generateRouter() {
    return createBrowserRouter([
        {
            path: '',
            element: <Layout />,
            children: [
                {
                    path: 'authors',
                    element: <AuthorIndexPage />,
                },
                {
                    path: 'authors/:authorId',
                    element: <AuthorPage />,
                },
                {
                    path: 'books',
                    element: <BookIndexPage />,
                },

                {
                    path: 'user/:userId',
                    element: <UserPage />,
                },
            ],
        },
    ]);
}
