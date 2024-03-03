import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import * as commander from 'commander';
import * as dotenv from 'dotenv';
import { DateTime } from 'luxon';
import * as hash from 'object-hash';
import { Author } from 'src/authors/author.entity';
import { CreateAuthorInput } from 'src/authors/inputs/create-author.input';

import { Book } from 'src/books/book.entity';
import { BooksService } from 'src/books/books.service';
import { CreateBookInput } from 'src/books/inputs/create-book.input';
import { generateTypeORMModuleOptions } from 'src/db/index';
import { getAuthorData, BulkAuthorsReturn, FetchedAuthorData } from 'src/chatgpt/UseChatgpt';

dotenv.config();

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

async function augmentAuthors(arr: CreateAuthorInput[]): Promise<CreateAuthorInput[]> {
    let getter: BulkAuthorsReturn;
    let names: string[] = [];
    let tempNames: string[] = [];
    const responses: FetchedAuthorData[] = [];

    let name: string;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].firstName != null) {
            name = arr[i].firstName + ' ' + arr[i].lastName;
            if (names.includes(name)) {
                continue;
            }
            names.push(name);
        } else {
            name = arr[i].lastName;
            if (names.includes(name)) {
                continue;
            }
            names.push(name);
        }
    }

    names = names.reverse();

    let round = 1;

    while (true) {
        for (let i = 0; i < 25; i++) {
            tempNames.push(names.pop());
            if (names.length == 0) {
                break;
            }
        }
        if (tempNames.length > 0) {
            getter = await getAuthorData(tempNames);
            for (let i = 0; i < getter.authors.length; i++) {
                responses.push(getter.authors.at(i));
            }
        }
        getter = null;
        tempNames = [];
        console.log('Finished round' + round + ' of ChatGpt calls (25 authors per round)..');
        round += 1;
        if (names.length == 0) {
            break;
        }
    }

    const lastList: CreateAuthorInput[] = [];
    let inputCounter = 0;
    let responseCounter = 0;
    let tempAuthorInput: CreateAuthorInput;

    while (responseCounter < responses.length && inputCounter < arr.length) {
        let s: string;
        if (arr.at(inputCounter).firstName == null) {
            s = arr.at(inputCounter).lastName;
        } else {
            s = arr[inputCounter].firstName + ' ' + arr[inputCounter].lastName;
            s = s.substring(1);
        }
        if (s === responses.at(responseCounter).name) {

            if (responses[responseCounter].death != null && responses[responseCounter].birth != null) {

                tempAuthorInput = arr.at(inputCounter);

                tempAuthorInput.bio = responses[responseCounter].bio;
                tempAuthorInput.hometown = responses[responseCounter].hometown;

                tempAuthorInput.dateOfDeath = DateTime.fromISO(responses[responseCounter].death).toJSDate();
                tempAuthorInput.dateOfBirth = DateTime.fromISO(responses[responseCounter].birth).toJSDate();

                lastList.push(tempAuthorInput);
            }

            responseCounter += 1;
        }
        inputCounter += 1;
    }

    return lastList;
}

function transformGutendexPersonToAuthor(gutendexPerson: GutendexPerson): CreateAuthorInput {
    const names = gutendexPerson.name.split(',');
    const transformedAuthor: CreateAuthorInput = {
        firstName: names[1],
        lastName: names[0],
        dateOfBirth: DateTime.fromObject({ year: gutendexPerson.birth_year }).toJSDate(),
        dateOfDeath: DateTime.fromObject({ year: gutendexPerson.death_year }).toJSDate(),
    };

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

    authorInputArr.push;

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

    console.log('authors created');

    const finAuthorInputs: CreateAuthorInput[] = await augmentAuthors(authorInputArr);

    for (let i = 0; i < finAuthorInputs.length; i++) {
        const author = await ds.manager.save(Author, finAuthorInputs.at(i));
        authorMap[hashes.at(i)] = author.id;
    }
    console.log('authors augmented');

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
