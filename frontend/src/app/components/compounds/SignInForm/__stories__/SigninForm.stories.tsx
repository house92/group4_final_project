import React from 'react';
import { Paper, Typography } from '@mui/material';
import SigninForm from '../SignInForm';

export default {
    title: 'Compounds/SigninForm',
};

export const Default = () => (
    <SigninForm onSubmit={handleSubmit} />
);

const handleSubmit = (SigninCreds) => {
    console.log("Form submitted with data:", SigninCreds);
}