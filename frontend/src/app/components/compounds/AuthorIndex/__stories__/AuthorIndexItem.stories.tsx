import Paper from '@mui/material/Paper';

import AuthorIndexItem from '../AuthorIndexItem';
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
                    <AuthorIndexItem name="Herman Melville" birthYear={1819} hometown="Nantucket" />
                </Paper>
            </Grid>
        </Grid>
    );
};
