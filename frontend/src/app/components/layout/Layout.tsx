import { Box, Stack } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Stack width={400}>
                    <Link to="/books">Books</Link>
                </Stack>

                <Outlet />
            </Box>
        </>
    );
}
