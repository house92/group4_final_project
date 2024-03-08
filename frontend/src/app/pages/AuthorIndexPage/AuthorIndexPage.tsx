import AuthorIndexItem from 'app/components/compounds/AuthorIndexItem';

import useAuthors from './UseListAuthors';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { useState } from 'react';
import { Pagination } from '@mui/material';

export default function AuthorIndexPage() {

    const [page, setPage] = useState(1);
    const pageLimit = 10;
    const offset = (page - 1) * pageLimit;
    const { authors } = useAuthors(pageLimit, offset);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div>
            <h1>Authors Index</h1>
            <div style={{ marginBottom: '20px' }}>
                {authors.map((author) => (
                    <Link to={`/authors/${author.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <AuthorIndexItem
                            authorId={author.id}
                            authorName={author.name}
                            birthYear={author.dateOfBirth}
                            hometown={author.hometown}
                        />
                    </Link>
                ))}
            </div>
            <Pagination count={Math.ceil(authors.length / pageLimit)} page={page} onChange={handleChange} />
        </div>
    );
}
