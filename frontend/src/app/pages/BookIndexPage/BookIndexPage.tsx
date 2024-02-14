import BookIndexItem from 'app/components/compounds/AuthorIndexItem';

import { useParams } from 'react-router-dom';
import useBooks from './UseListBooks';

export default function BookIndexPage() {
    const { books } = useBooks();

    return (
        <div>
            <h1>Book Index</h1>
            <div style={{ marginBottom: '20px' }}></div>
            {books.map((book) => (
                <BookIndexItem
                    coverImage={book.coverImage}
                    title={book.title}
                    author={book.author}
                    publicationYear={book.publicationYear}
                />
            ))}
        </div>
    );
}
