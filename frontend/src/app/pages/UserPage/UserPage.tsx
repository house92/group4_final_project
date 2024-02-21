import React from 'react';
import { Box, Typography } from '@mui/material';
import UserDetails from 'app/components/compounds/UserDetails/UserDetails';
import { useParams } from 'react-router-dom';
import useUser from './UseUser';

export default function UserPage() {
    const { userId } = useParams();
    const { user } = useUser(userId);

    return (
        <Box>
            <Box marginBottom="20px" />
            <UserDetails name={user?.name} age={user?.dateOfBirth} bio={user?.bio} id={''} />
        </Box>
    );
}
