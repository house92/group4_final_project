import { UserSession as ServerUserSession, useGetUserSessionQuery } from 'generated/graphql';

interface UserSession extends ServerUserSession {
    fullName: string;
}

export default function useUserSession(): UserSession | null {
    const { data } = useGetUserSessionQuery();

    if (!data?.getUserSession) {
        return null;
    }

    return {
        ...data.getUserSession,
        fullName: `${data?.getUserSession.firstName} ${data?.getUserSession.lastName}`,
    };
}
