import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { Reviewer } from './ChatGptReviewerPanel';

export default function ChatGptReviewer({ clicked, reviewer, title }) {
    const [buttonClicked, setButtonClicked] = useState(false);
    const [textContent, setTextContent] = useState('');

    let articleName: string;
    let tempArticle: string;

    switch (reviewer) {
        case Reviewer.MARY_POPPINS:
            articleName = "Mary Poppins' Spoonful of Sugar:";
            tempArticle = 'Mary Poppins is writing her review...';
            break;
        case Reviewer.BASEBALL_JOE:
            articleName = "Baseball Joe's Grand Slam:";
            tempArticle = 'Baseball Joe is writing his review...';
            break;
        case Reviewer.CAVEMAN:
            articleName = "Caveman's Chronicle:";
            tempArticle = 'Caveman is writing his review...';
            break;
        case Reviewer.POPEYE:
            articleName = "Popeye's Piece:";
            tempArticle = 'Popeye the Sailor is writing his review...';
            break;
        default:
            articleName = "Popeye's Piece:";
            tempArticle = 'Popeye the Sailor is writing his review...';

    }

    const handleButtonClick = async () => {
        try {
            setTextContent(tempArticle);
            const result = await clicked(title, reviewer);
            setTextContent(result);
        } catch (error) {
            console.log('Error:', error);
        }
        setButtonClicked(true);
    };

    return (
        <Box>
            <Typography variant="h5">{articleName}</Typography>
            <Box display="flex" alignItems="center">
                <Button
                    variant="contained"
                    style={{ marginLeft: '16px' }}
                    onClick={handleButtonClick}
                    disabled={buttonClicked}
                >
                    See Review
                </Button>
            </Box>
            <Typography variant="body1" style={{ marginTop: '16px' }}>
                {textContent}
            </Typography>
        </Box>
    );
}
