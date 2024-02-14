import { Paper, Typography } from '@mui/material';

interface BookIndexItemProps {
    coverImage: string;
    title: string;
    author: string;
    publicationYear: string;
}

export default function BookIndexItem({ coverImage, title, author, publicationYear }: BookIndexItemProps) {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            <img src={coverImage} alt="Book Cover" style={{ maxWidth: '100%', marginBottom: 10 }} />
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body1">Author: {author}</Typography>
            <Typography variant="body1">Publication Year: {publicationYear}</Typography>
        </Paper>
    );
}
