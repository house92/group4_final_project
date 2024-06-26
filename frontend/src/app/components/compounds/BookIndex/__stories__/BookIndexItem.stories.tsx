import Paper from '@mui/material/Paper';

import BookIndexItem from '../BookIndexItem';
import { Grid } from '@mui/material';
import { DateTime } from 'luxon';

export default {
    title: 'Compounds/BookIndexItem',
    component: BookIndexItem,
};

export const Basic = (args) => {
    return (
        <Grid container>
            <Grid item xs={12} sm={9} lg={6}>
                <Paper variant="outlined" sx={{ p: 4, background: '#ffffee' }}>
                    <BookIndexItem
                        coverImage="Cover Image URL"
                        title="Green Eggs and Ham"
                        authorNames={['Dr.Seuss']}
                        publicationDate={DateTime.now().minus({ years: 10 })}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
};
