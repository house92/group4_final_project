import AuthorIndexItem from 'app/components/compounds/AuthorIndexItem';

import { useParams } from 'react-router-dom';
import useAuthors from './UseListAuthors';

export default function AuthorIndexPage() {
    const { authors } = useAuthors();

    console.log(authors.length);

    return (
        <div>
            {authors.map((author) => (
                <AuthorIndexItem
                    authorId={author.id}
                    authorName={author.name}
                    birthYear={author.dateOfBirth}
                    hometown={author.hometown}
                />
            ))}
        </div>
    );
}
