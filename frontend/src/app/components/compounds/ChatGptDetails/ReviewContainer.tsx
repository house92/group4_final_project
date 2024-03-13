import { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import ReviewPanel from './ReviewPanel';

export enum Reviewer {
    MaryPoppins,
    BaseballJoe,
    Caveman,
    Popeye,
}

const TABS = [
    { label: 'Mary Poppins', value: Reviewer.MaryPoppins },
    { label: 'Baseball Joe', value: Reviewer.BaseballJoe },
    { label: 'Caveman', value: Reviewer.Caveman },
    { label: 'Popeye', value: Reviewer.Popeye },
];

export interface ReviewContainerProps {
    onReviewRequest: (reviewer: Reviewer) => Promise<string>;
    isLoading?: boolean;
}

export default function ReviewContainer({
    onReviewRequest: handleReviewRequest,
    isLoading = false,
}: ReviewContainerProps) {
    const [reviewerTab, setReviewerTab] = useState<Reviewer>(Reviewer.MaryPoppins);
    const [savedReviewMap, setSavedReviewMap] = useState<{ [key: string]: string }>({});

    const handleChange = (event: React.SyntheticEvent, newValue: Reviewer) => {
        setReviewerTab(newValue);
    };

    function setReviewForReviewer(reviewer: Reviewer, review: string) {
        setSavedReviewMap({
            ...savedReviewMap,
            [reviewer]: review,
        });
    }

    const onReviewRequest = async (reviewer: Reviewer) => {
        const review: string = await handleReviewRequest(reviewer);
        setReviewForReviewer(reviewer, review);
        return review;
    };

    let heading: string;
    let placeholder: string;

    switch (reviewerTab) {
        case Reviewer.MaryPoppins:
            heading = "Mary Poppins' Spoonful of Sugar:";
            placeholder = 'Mary Poppins is writing her review...';
            break;
        case Reviewer.BaseballJoe:
            heading = "Baseball Joe's Grand Slam:";
            placeholder = 'Baseball Joe is writing his review...';
            break;
        case Reviewer.Caveman:
            heading = "Caveman's Chronicle:";
            placeholder = 'Caveman is writing his review...';
            break;
        case Reviewer.Popeye:
            heading = "Popeye's Piece:";
            placeholder = 'Popeye the Sailor is writing his review...';
            break;
        default:
            heading = "Popeye's Piece:";
            placeholder = 'Popeye the Sailor is writing his review...';
    }

    return (
        <Paper variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ width: 600, typography: 'body1', height: 500 }}>
                <TabContext value={reviewerTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="Reviewer Changed">
                            {TABS.map(({ label, value }) => (
                                <Tab label={label} value={value} />
                            ))}
                        </TabList>
                    </Box>

                    <ReviewPanel
                        onReviewRequest={onReviewRequest}
                        reviewer={reviewerTab}
                        body={savedReviewMap[reviewerTab]}
                        placeholder={isLoading ? placeholder : undefined}
                        heading={heading}
                    ></ReviewPanel>
                </TabContext>
            </Box>
        </Paper>
    );
}
