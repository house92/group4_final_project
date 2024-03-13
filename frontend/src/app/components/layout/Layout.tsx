import { Box, Button, Stack, Typography } from '@mui/material';
import { useUserSession } from 'app/core/Session';
import { Link, Outlet } from 'react-router-dom';
import useSignOut from 'app/pages/SignOutPage/useSignOut';

const NAV_WIDTH = 300;

export default function Layout() {
    const userSession = useUserSession();
    const { handleSignOut } = useSignOut();

    return (
        <Box display="flex" flexDirection="row">
            <Box
                sx={(theme) => ({ display: { xs: 'none', md: 'flex' }, background: theme.palette.secondary.main })}
                position="fixed"
                minWidth={NAV_WIDTH}
                width={NAV_WIDTH}
                height="100vh"
            >
                <Box display="flex" flexDirection="column" justifyContent="space-between" p={6}>
                    <Stack gap={4}>
                        {userSession && (
                            <Link to={`/users/${userSession.id}`} style={{ textDecoration: 'none' }}>
                                <Typography color="white" variant="h5" component="p">
                                    {userSession.fullName}
                                </Typography>
                            </Link>
                        )}

                        <Stack gap={1}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Typography color="white">Home</Typography>
                            </Link>

                            <Link to="/authors" style={{ textDecoration: 'none' }}>
                                <Typography color="white">Authors</Typography>
                            </Link>

                            <Link to="/books" style={{ textDecoration: 'none' }}>
                                <Typography color="white">Books</Typography>
                            </Link>

                            {userSession && (
                                <Link to={`/users/${userSession.id}/friends`} style={{ textDecoration: 'none' }}>
                                    <Typography color="white">Friends</Typography>
                                </Link>
                            )}
                        </Stack>
                    </Stack>

                    {userSession ? (
                        // we need to make this actually sign the user out
                        <Button href="/sign-in" variant="contained" onClick={handleSignOut}>
                            Sign out
                        </Button>
                    ) : (
                        <Stack gap={1}>
                            <Button href="/sign-in" variant="contained">
                                Sign in
                            </Button>
                            <Button href="/register" variant="contained">
                                Register
                            </Button>
                        </Stack>
                    )}
                </Box>
            </Box>

            <Box
                ml={`${NAV_WIDTH}px`}
                p={4}
                width={`calc(100vw - ${NAV_WIDTH}px)`}
                minHeight="100vh"
                sx={(theme) => ({ bgcolor: theme.palette.background.default })}
            >
                <Outlet />
            </Box>
        </Box>
    );
}
