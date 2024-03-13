import { Box, Button, Typography } from '@mui/material';
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
        <Box sx={{ width: 600, height: 400 }}>
            <Typography variant="h5" component="p" sx={{ m: 4 }}>
                {heading}
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ m: 4 }}>
                <Button variant="contained" onClick={() => onReviewRequest(reviewer)} disabled={!!body}>
                    See Review
                </Button>
            </Box>
            <Box sx={{ width: 600, height: 250, overflowY: 'auto' }}>
                <Typography variant="body1" sx={{ m: 4, whiteSpace: 'pre-wrap' }}>
                    {body ?? placeholder}
                </Typography>
            </Box>
        </Box>
    );
}
