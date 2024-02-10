import React from 'react';
import { Paper, Typography } from '@mui/material';
import SigninForm from "./SigninForm";
import { useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';

const SIGN_IN_USER_MUTATION = gql`
mutation SignInUser($email: String!, $password: String!) {
    SignInUser(email: $email, password: $password) {
        id
        firstName
        lastName
        token
    }
}
`;

export default SignInPage;
