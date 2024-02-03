import { useMemo } from 'react';
import { RouterProvider as ReactRouterProvider } from 'react-router-dom';

import { generateRouter } from './routes';

/**
 * obtains Apollo client and Okta data to pass to loaders, then
 * generates the Remix router to be passed to ReactRouter
 * @returns instance of React Router's RouterProvider
 */
export function RouterProvider() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const router = useMemo(() => generateRouter(), []);

    return <ReactRouterProvider router={router} />;
}
