import { TextField } from '@mui/material';
import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<typeof TextField> {
    readOnly?: boolean;
}

export default function Input({ readOnly = false, sx, ...props }: InputProps) {
    return (
        <TextField
            variant="outlined"
            InputProps={{
                readOnly,
            }}
            fullWidth
            {...props}
            sx={{
                ...sx,
                '.MuiOutlinedInput-root.Mui-readOnly': {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    paddingLeft: 0,
                    paddingRight: 0,

                    '&.Mui-focused.Mui-focused': {
                        boxShadow: 'none',
                    },

                    '> .MuiOutlinedInput-notchedOutline': {
                        display: 'none',
                    },
                },
            }}
        />
    );
}
