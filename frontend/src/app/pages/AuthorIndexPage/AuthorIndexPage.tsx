import AuthorIndexItem from 'app/components/compounds/AuthorIndexItem';

import useAuthors from './UseListAuthors';
import { Link } from 'react-router-dom';

export default function AuthorIndexPage() {
    const { authors } = useAuthors();

    return (
        <div>
            <h1>Authors Index</h1>
            <div style={{ marginBottom: '20px' }}></div>
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
    );
}
