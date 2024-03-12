import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

interface SearchBarProps {
    initialValue?: string;
    onSubmit: (searchTerm: string) => void;
}

export default function SearchBar({ initialValue = '', onSubmit }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState(initialValue);

    return (
        <Box display="flex" flexDirection="row" gap={2} component="form">
            <TextField
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                sx={{ minWidth: 300 }}
            />

            <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    onSubmit(searchTerm);
                }}
            >
                Search
            </Button>
        </Box>
    );
}
