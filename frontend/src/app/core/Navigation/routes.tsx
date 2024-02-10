import { createBrowserRouter } from 'react-router-dom';
import { AuthorIndexPage } from 'app/pages';

export function generateRouter() {
    return createBrowserRouter([
        {
            path: '',
            children: [
                {
                    path: 'authors',
                    element: <AuthorIndexPage />,
                }
            ],
        },
    ]);
}
