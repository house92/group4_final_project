import BookDetails from '../BookDetails';
import { DateTime } from 'luxon';

export default {
    title: 'Compounds/BookDetails',
};

export const Default = () => (
    <BookDetails
        title="Book Title"
        coverImage="Cover Image URL"
        authors={[{ name: 'John Doe', id: '123' }]}
        publicationDate={DateTime.now().minus({ years: 10 })}
        synopsis="This is the books synopsis... 123"
    />
);
