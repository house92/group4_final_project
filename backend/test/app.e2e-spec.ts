import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { AuthorsService } from 'src/authors/authors.service';

describe('AuthorsModule', () => {
    let app: INestApplication;
    const authorsService = {
        findAll: () => ['test'],
        findById: () => 'test',
        create: () => 'test',
        update: () => 'test',
        remove: () => 'test',
    };

    const booksService = {
        findAll: () => ['test'],
        findById: () => 'test',
        create: () => 'test',
        update: () => 'test',
        remove: () => 'test',
    };

    const bookReviewsService = {
        findAllByUser: () => ['test'],
        findOneByUser: () => 'test',
        findAllByBook: () => 'test',
        create: () => 'test',
        remove: () => 'test',
    };

    const usersService = {
        findAll: () => ['test'],
        findById: () => 'test',
        create: () => 'test',
        update: () => 'test',
        remove: () => 'test',
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(AuthorsService)
            .useValue(authorsService)
            .overrideProvider(BooksService)
            .useValue(booksService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    /*  tests for authors */

    it('GET: authors', () => {
        return request(app.getHttpServer()).get('/authors').expect(200, { data: authorsService.findAll() });
    });

    it('GET: authors/:id', () => {
        return request(app.getHttpServer()).get('/authors/1').expect(200, { data: authorsService.findById() });
    });

    it('POST: authors', () => {
        return request(app.getHttpServer()).post('/authors').expect(201, { data: authorsService.create() });
    });

    it('PUT: authors/:id', () => {
        return request(app.getHttpServer()).put('/authors/1').expect(200, { data: authorsService.update() });
    });

    it('DELETE: authors/:id', () => {
        return request(app.getHttpServer()).delete('/authors/1').expect(200, { data: authorsService.remove() });
    });

    /*  tests for books */

    it('GET: books', () => {
        return request(app.getHttpServer()).get('/books').expect(200, { data: booksService.findAll() });
    });

    it('GET: books/:id', () => {
        return request(app.getHttpServer()).get('/books/1').expect(200, { data: booksService.findById() });
    });

    it('POST: books', () => {
        return request(app.getHttpServer()).post('/books').expect(201, { data: booksService.create() });
    });

    it('PUT: books/:id', () => {
        return request(app.getHttpServer()).put('/books/1').expect(200, { data: booksService.update() });
    });

    it('DELETE: books/:id', () => {
        return request(app.getHttpServer()).delete('/books/1').expect(200, { data: booksService.remove() });
    });

    /*  tests for book reviews */

    it('GET: bookreviews', () => {
        return request(app.getHttpServer())
            .get('/bookreviews')
            .expect(200, { data: bookReviewsService.findAllByUser() });
    });

    it('GET: bookreviews/:id', () => {
        return request(app.getHttpServer())
            .get('/bookreviews/1')
            .expect(200, { data: bookReviewsService.findOneByUser() });
    });

    it('GET: bookreviews', () => {
        return request(app.getHttpServer())
            .get('/bookreviews')
            .expect(200, { data: bookReviewsService.findAllByBook() });
    });

    it('POST: bookreviews', () => {
        return request(app.getHttpServer()).post('/bookreviews').expect(201, { data: bookReviewsService.create() });
    });

    it('DELETE: bookreviews/:id', () => {
        return request(app.getHttpServer()).delete('/bookreviews/1').expect(200, { data: bookReviewsService.remove() });
    });

    /*tests for users*/
    it('GET: users', () => {
        return request(app.getHttpServer()).get('/users').expect(200, { data: usersService.findAll() });
    });

    it('GET: users/:id', () => {
        return request(app.getHttpServer()).get('/users/1').expect(200, { data: usersService.findById() });
    });

    it('POST: users', () => {
        return request(app.getHttpServer()).post('/users').expect(201, { data: usersService.create() });
    });

    it('PUT: users/:id', () => {
        return request(app.getHttpServer()).put('/users/1').expect(200, { data: usersService.update() });
    });

    it('DELETE: users/:id', () => {
        return request(app.getHttpServer()).delete('/users/1').expect(200, { data: usersService.remove() });
    });

    afterAll(async () => {
        await app.close();
    });
});
