import { createBrowserRouter } from 'react-router-dom';

export function generateRouter() {
    return createBrowserRouter([
        {
            path: '',
            children: [],
        },
    ]);
}
