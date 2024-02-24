import { createBrowserRouter } from 'react-router-dom';
import { AuthorIndexPage, AuthorPage, BookIndexPage, UserPage, BookPage } from 'app/pages';
import { Layout } from 'app/components';
import SignInPage from 'app/pages/SignInPage';

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
                    path: 'sign-in',
                    element: <SignInPage />,
                },
                {
                    path: 'books',
                    element: <BookIndexPage />,
                },
                {
                    path: 'user/:userId',
                    element: <UserPage />,
                },
                {
                    path: 'books/:bookId',
                    element: <BookPage />,
                },
            ],
        },
    ]);
}
