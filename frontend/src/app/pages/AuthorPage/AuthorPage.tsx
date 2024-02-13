import AuthorDetails from 'app/components/compounds/AuthorDetails/AuthorDetails';

import { useParams } from 'react-router-dom';
import useAuthor from './UseAuthor';

export default function AuthorPage() {
    const { author } = useAuthor();

    return (
        <div>
            <h1>Author</h1>
            <div style={{ marginBottom: '20px' }}></div>
            <AuthorDetails
                name={author.name}
                birthYear={author.dateOfBirth}
                homeTown={author.hometown}
                bio={author.bio}
            />
        </div>
    );
}