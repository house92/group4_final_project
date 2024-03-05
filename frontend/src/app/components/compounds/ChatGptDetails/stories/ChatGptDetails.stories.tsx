import React from 'react';
import { Paper, Typography } from '@mui/material';
import ReviewContainer, { Reviewer } from '../ReviewContainer';

export default {
    title: 'Compounds/ChatGptReviewerPanel',
};

async function tester(reviewer: Reviewer): Promise<string> {

    return 'Button clicked for reviewer ' + reviewer + ' for a title.';
}

export const Default = () => <ReviewContainer onReviewRequest={tester} />;
