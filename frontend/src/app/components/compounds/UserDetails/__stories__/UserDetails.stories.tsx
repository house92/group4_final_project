import React from 'react';
import { Paper, Typography } from '@mui/material';
import UserDetails from '../UserDetails';
import { DateTime } from 'luxon';

export default {
    title: 'Compounds/UserDetails',
};

export const Default = () => (
    <UserDetails 
    name="John Doe" 
    bio="bio of user" 
    age={20} />
);
