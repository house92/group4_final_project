import AuthorIndexItem from 'app/components/compounds/AuthorIndexItem';

import useAuthors from './UseListAuthors';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { useState } from 'react';
import { Pagination } from '@mui/material';
import { useQuery } from '@apollo/client';
import { useGetAuthorsListQuery } from '../../../generated/graphql';

export default function AuthorIndexPage() {
    const [page, setPage] = useState(1);
    const pageLimit = 10;

    const { loading, error, data } = useQuery(useGetAuthorsListQuery, {
        variables: {
            page: page,
            pageLimit: pageLimit,
        },
    });

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const authors = data.listAuthors.nodes;

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
            <Pagination
                count={Math.ceil(data.listAuthors.totalEdges / pageLimit)}
                page={page}
                onChange={handleChange}
            />
        </div>
    );
}
