import React from 'react';
import { Paper, Typography } from '@mui/material';
import AuthorDetails from '../AuthorDetails';

export default {
    title: 'Compounds/AuthorDetails',
};

export const Default = () => (
    <AuthorDetails 
        firstName="John"
        lastName="Doe"
        dateOfBirth="2002-11-11"
        homeTown="Chicago"
        bio="This is the bio..."
    />
);