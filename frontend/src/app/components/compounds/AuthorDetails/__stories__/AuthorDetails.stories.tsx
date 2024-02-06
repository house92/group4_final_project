import React from 'react';
import { Paper, Typography } from '@mui/material';
import AuthorDetails from '../AuthorDetails';

export default {
    title: 'Compounds/AuthorDetails',
};

export const Default = () => (
    <AuthorDetails 
        authorName="John Doe"
        birthYear="2002"
        homeTown="Chicago"
        bio="This is the bio..."
    />
);