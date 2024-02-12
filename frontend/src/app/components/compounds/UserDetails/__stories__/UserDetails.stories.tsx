import React from 'react';
import { Paper, Typography } from '@mui/material';
import UserDetails from '../UserDetails';

export default {
    title: 'Compounds/UserDetails',
};

export const Default = () => (
    <UserDetails
        id="8004b2f0-fccc-42e2-942b-e298562bde97"
        firstName="John"
        lastName="Doe"
        bio="bio of user"
        age="20"
    />
);
