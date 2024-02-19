import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const labels: { [index: string]: string } = {
    1: 'Terrible',
    2: 'Below Average',
    3: 'Okay',
    4: 'Good',
    5: 'Excellent+',
};

export default function BookReview() {
    const value = 4;

    return (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Rating
                name="text-feedback"
                value={value}
                readOnly
                precision={1.0}
                emptyIcon={<StarIcon style={{ opacity: 1.00 }} fontSize="inherit" />}
            />
            <Box sx={{ ml: 2 }}>{labels[value]}</Box>
        </Box>
    );
}

