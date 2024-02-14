import { createBrowserRouter } from 'react-router-dom';
import { AuthorIndexPage, SignInPage } from 'app/pages';
import AuthorPage from 'app/pages/AuthorPage';
import SignInForm from 'app/components/compounds/SignInForm';

export function generateRouter() {
    return createBrowserRouter([
        {
            path: '',
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
                    path: 'signin',
                    element: <SignInPage />,
                },
            ],
        },
    ]);
}