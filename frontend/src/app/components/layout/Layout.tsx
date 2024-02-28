import { Box, Button, Stack, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const NAV_WIDTH = 300;

export default function Layout() {
    return (
        <Box display="flex" flexDirection="row">
            <Box
                sx={{ display: { xs: 'none', md: 'flex' } }}
                position="fixed"
                minWidth={NAV_WIDTH}
                width={NAV_WIDTH}
                height="100vh"
                bgcolor="#2E3B4E"
            >
                <Box display="flex" flexDirection="column" justifyContent="space-between" p={6}>
                    <Stack gap={1}>
                        <Link to="/authors" style={{ textDecoration: 'none' }}>
                            <Typography color="white">Authors</Typography>
                        </Link>

                        <Link to="/books" style={{ textDecoration: 'none' }}>
                            <Typography color="white">Books</Typography>
                        </Link>
                    </Stack>

                    <Button href="/sign-in" variant="contained">
                        Sign in
                    </Button>
                </Box>
            </Box>

            <Box ml={`${NAV_WIDTH}px`} p={4}>
                <Outlet />
            </Box>
        </Box>
    );
}
