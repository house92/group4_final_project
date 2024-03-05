import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Reviewer } from './ReviewContainer';

interface ReviewPanelProps {
    onReviewRequest: (reviewer: Reviewer) => void;
    reviewer: Reviewer;
    placeholder: string | undefined;
    body: string | undefined;
    heading: string;
}

export default function ReviewPanel({ onReviewRequest, reviewer, placeholder, body, heading }: ReviewPanelProps) {
    return (
        <Box>
            <Typography variant="h5" component="p">
                {heading}
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" onClick={() => onReviewRequest(reviewer)} disabled={!!body}>
                    See Review
                </Button>
            </Box>
            <Typography variant="body1" style={{ marginTop: '16px' }}>
                {body ?? placeholder}
            </Typography>
        </Box>
    );
}
