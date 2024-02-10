import { AuthorIndexItem } from 'app/components/compounds/AuthorIndexItem';
import { useParams } from 'react-router-dom';
import useListAuthors from './UseListAuthors';


export default function AuthorIndexPage() {
    const { authorArr } = useListAuthors();

    return (
        <div>
            {authorArr.map((author) => (
                <AuthorIndexItem authorId={author.id} authorName={author.firstName} birthYear={author.dateOfBirth} hometown={author.hometown} />
            ))}
        </div>
    );
}