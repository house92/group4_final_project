import { createBrowserRouter } from 'react-router-dom';
import { AuthorIndexPage } from 'app/pages';
import AuthorPage from 'app/pages/AuthorPage';

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