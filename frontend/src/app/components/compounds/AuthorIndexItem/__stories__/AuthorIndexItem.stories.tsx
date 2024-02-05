import Paper from '@mui/material/Paper';

import AuthorIndexItem from '..';
import { Grid } from '@mui/material';

export default {
    title: 'Compounds/AuthorIndexItem',
    component: AuthorIndexItem,
};

export const Basic = (args) => {
    return (
        <Grid container>
            <Grid item xs={12} sm={9} lg={6}>
                <Paper variant="outlined" sx={{ p: 4, background: '#ffffee' }}>
                    <AuthorIndexItem
                        authorID="12345"
                        firstName="Herman"
                        lastName="Melville"
                        birthYear="1819"
                        hometown="Nantucket"
                        canEdit={false}
                        canDelete={false}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
};
