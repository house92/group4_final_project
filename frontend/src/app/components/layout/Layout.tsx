import { Box, Stack, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <Box display="flex" flexDirection="row">
            <Box
                sx={{ display: { xs: 'none', md: 'flex' } }}
                minWidth={200}
                width={200}
                height="100vh"
                p={6}
                mr={4}
                bgcolor="#2E3B4E"
            >
                <Stack>
                    <Link to="/authors" style={{ textDecoration: 'none' }}>
                        <Typography color="white">Authors</Typography>
                    </Link>

                    <Link to="/books" style={{ textDecoration: 'none' }}>
                        <Typography color="white">Books</Typography>
                    </Link>
                </Stack>
            </Box>

            <Outlet />
        </Box>
    );
}
