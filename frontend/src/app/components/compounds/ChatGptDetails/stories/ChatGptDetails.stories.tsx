import React from 'react';
import { Paper, Typography } from '@mui/material';
import ChatGptDetails from '../ChatGptDetails';
import { DateTime } from 'luxon';

export default {
    title: 'Compounds/ChatGptDetails',
};

async function tester(): Promise<string> {
    console.log("clicked.");

    return 'Button clicked.';
}

export const Default = () => <ChatGptDetails clicked={tester} />;
