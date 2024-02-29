import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import * as commander from 'commander';
import * as dotenv from 'dotenv';
import { DateTime } from 'luxon';
import * as hash from 'object-hash';
import { toArray } from 'rxjs';
import { Author } from 'src/authors/author.entity';
import { CreateAuthorInput } from 'src/authors/inputs/create-author.input';

import { Book } from 'src/books/book.entity';
import { BooksService } from 'src/books/books.service';
import { CreateBookInput } from 'src/books/inputs/create-book.input';
import { generateTypeORMModuleOptions } from 'src/db/index';

dotenv.config();

async function augmentAuthors(arr: CreateAuthorInput[]): Promise<CreateAuthorInput[]> {
    return arr;
}

@Module({
    imports: [TypeOrmModule.forRoot(generateTypeORMModuleOptions()), TypeOrmModule.forFeature([Book, Author])],
    providers: [BooksService],
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

function transformGutendexPersonToAuthor(gutendexPerson: GutendexPerson): CreateAuthorInput {
    const names = gutendexPerson.name.split(',');
    const transformedAuthor: CreateAuthorInput = {
        firstName: names[1],
        lastName: names[0],
        dateOfBirth: DateTime.fromObject({ year: gutendexPerson.birth_year }).toISODate(),
        dateOfDeath: DateTime.fromObject({ year: gutendexPerson.death_year }).toISODate(),
    };
    console.log("First name" + names[1]);
    console.log("Last name" + names[0]);
    console.log("Date of birth: " + DateTime.fromObject({ year: gutendexPerson.birth_year }).toISODate());
    console.log("Date of death: " + DateTime.fromObject({ year: gutendexPerson.death_year }).toISODate());

    return transformedAuthor;
}

function transformGutendexBookToBook(gutendexBook: GutendexBook, authorMap: AuthorMap): CreateBookInput {
    const transformedBook: CreateBookInput = {
        title: gutendexBook.title,
        authorIds: gutendexBook.authors.map((author) => authorMap[hash(author)]),
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

    const booksService = app.get(BooksService);

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
    const authorInputArr: CreateAuthorInput[] = [];
    const hashes: string[] = [];

    authorInputArr.push

    console.log('creating authors..');

    for (const book of gutendexBooks) {
        for (const gutendexAuthor of book.authors) {
            const hashId = hash(gutendexAuthor);

            if (!authorMap[hashId]) {
                authorInputArr.push(transformGutendexPersonToAuthor(gutendexAuthor));
                hashes.push(hashId);
            }
        }
    }

    const finAuthorInputs: CreateAuthorInput[] = await augmentAuthors(authorInputArr);

    console.log('authors created');
  
    for (let i = 0; i < finAuthorInputs.length; i++) {
        const author = await ds.manager.save(Author, finAuthorInputs.at(i));
        authorMap[hashes.at(i)] = author.id;

    }

    console.log('creating books..');

    const books = gutendexBooks.map((book) => transformGutendexBookToBook(book, authorMap));

    // await ds.manager.save(Book, books);
    for (const book of books) {
        if (book.coverImage && book.authorIds.length > 0) {
            await booksService.create(book);
        }
    }

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
