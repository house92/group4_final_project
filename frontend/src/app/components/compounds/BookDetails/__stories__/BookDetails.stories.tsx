import BookDetails from '../BookDetails';
import { DateTime } from 'luxon';

export default {
    title: 'Compounds/BookDetails',
};

export const Default = () => (
    <BookDetails
        id="abc-123"
        title="Book Title"
        coverImage="Cover Image URL"
        authorNames={['John Doe']}
        publicationDate={DateTime.now().minus({ years: 10 })}
        synopsis="This is the books synopsis... 123"
    />
);
