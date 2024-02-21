import { createBrowserRouter } from 'react-router-dom';
import { AuthorIndexPage } from 'app/pages';
import AuthorPage from 'app/pages/AuthorPage';
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
            ],
        },
    ]);
}