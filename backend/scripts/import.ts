import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import * as commander from 'commander';
import * as dotenv from 'dotenv';
// import { DateTime } from 'luxon';
// import hash from 'object-hash';

import { Book } from 'src/books/book.entity';
import { generateTypeORMModuleOptions } from 'src/db/index';

dotenv.config();

@Module({
    imports: [TypeOrmModule.forRoot(generateTypeORMModuleOptions())],
})
export class BookModule {}

const GUTENDEX_API_ENDPOINT = 'https://gutendex.com/books';

interface GutendexPerson {
    name: string;
    birth_year: number;
    death_year: number;
}

interface GutendexBook {
    id: string;
    title: string;
    authors: GutendexPerson[];
    translators: GutendexPerson[];
    subjects: string[];
    bookshelves: string[];
    languages: string[];
    copyright: boolean;
    media_type: string;
    formats: {
        'text/html'?: string;
        'application/epub+zip'?: string;
        'image/jpeg'?: string;
    };
    download_count: number;
}

interface GutendexResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: GutendexBook[];
}

/**
 * This is for creating a map of unique author IDs,
 * made by hashing the object from Gutendex, to IDs
 * in our database
 */
interface AuthorMap {
    [key: string]: string;
}

// TODO: add back in once Author entity exists
// function transformGutendexPersonToAuthor(gutendexPerson: GutendexPerson): Author {
//     const names = gutendexPerson.name.split(',');
//     const transformedAuthor: Author = {
//         firstName: names[1],
//         lastName: names[2],
//         dateOfBirth: DateTime.fromObject({ year: gutendexPerson.birth_year }),
//         dateOfDeath: DateTime.fromObject({ year: gutendexPerson.death_year }),
//     };
// }

function transformGutendexBookToBook(gutendexBook: GutendexBook, authorMap: AuthorMap): Omit<Book, 'id'> {
    const transformedBook: Omit<Book, 'id'> = {
        title: gutendexBook.title,
        // authorIds: gutendexBook.authors.map((author) => authorMap[hash(author)]),
        coverImage: gutendexBook.formats['image/jpeg'],
        downloadUrl: gutendexBook.formats['application/epub+zip'] || gutendexBook.formats['text/html'],
    };

    return transformedBook;
}

interface ImportBooksArgs {
    limit?: string;
}

async function importBooks({ limit: limitString }: ImportBooksArgs) {
    console.log('starting..');

    let dataEndpoint: string | null = GUTENDEX_API_ENDPOINT;
    let gutendexBooks: GutendexBook[] = [];
    let counter = 0;
    const limit = Number(limitString) ?? undefined;

    console.log({ limitString, limit });

    console.log('initializing Nest app..');

    // set up Nest app
    const app = await NestFactory.createApplicationContext(BookModule);
    const ds = app.get(getDataSourceToken());

    console.log('Nest app initialized');

    console.log('fetching data..');

    while (dataEndpoint) {
        try {
            const raw = await fetch(dataEndpoint);
            const res: GutendexResponse = await raw.json();

            dataEndpoint = res.next;

            gutendexBooks = gutendexBooks.concat(res.results);

            if (gutendexBooks.length > counter + 500) {
                console.log(`fetched ${gutendexBooks.length} books`);
                counter += 500;
            }

            if (limit && gutendexBooks.length >= limit) {
                dataEndpoint = null;
            }
        } catch (error) {
            console.error(error);
        }
    }

    console.log('data fetched');

    const authorMap: AuthorMap = {};

    // TODO: add back in once Author entity exists
    // console.log('creating authors..');

    // for (const book of gutendexBooks) {
    //     for (const gutendexAuthor of book.authors) {
    //         const hashId = hash(gutendexAuthor);

    //         if (!authorMap[hashId]) {
    //             const author = await ds.manager.create(Author, transformGutendexPersonToAuthor(gutendexAuthor));
    //             authorMap[hashId] = author.id;
    //         }
    //     }
    // }

    // console.log('authors created');

    console.log('creating books..');

    const books = gutendexBooks.map((book) => transformGutendexBookToBook(book, authorMap));

    await ds.manager.save(Book, books);

    console.log('books created');

    console.log(`added ${books.length} books to database`);

    await app.close();

    console.log('finished');
}

const run = async function () {
    const program = new commander.Command();

    program
        .command('books')
        .description('imports books and authors from Gutendex API')
        .option('--limit <limit>')
        .action(importBooks);

    program.parse(process.argv);
};

run();

export default run;
