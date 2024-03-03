import { createBrowserRouter } from 'react-router-dom';
import { AuthorIndexPage, AuthorPage, BookIndexPage, UserPage, BookPage, HomePage } from 'app/pages';
import { Layout } from 'app/components';
import SignInPage from 'app/pages/SignInPage';
import FriendPage from 'app/pages/FriendPage';

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
                    path: 'users/:userId',
                    element: <UserPage />,
                },
                {
                    path: 'books/:bookId',
                    element: <BookPage />,
                },
                {
                    path: '/users/:userId/friends',
                    element: <FriendPage />,
                },
                {
                    path: '/',
                    element: <HomePage />,
                },
            ],
        },
    ]);
}
