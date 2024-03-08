import React from 'react';
import { useSignOutUserMutation } from 'generated/graphql';

const useSignOut = () => {
    const [signOutUserMutation] = useSignOutUserMutation();

    const handleSignOut = async () => {
        try {
            await signOutUserMutation();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return { handleSignOut };
};

export default useSignOut;
