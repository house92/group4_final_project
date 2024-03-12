import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Book } from 'src/books/book.entity';
import { BooksService } from 'src/books/books.service';

@Module({
    imports: [TypeOrmModule.forFeature([Author, Book])],
    providers: [AuthorsService, AuthorsResolver, BooksService],
})
export class AuthorsModule {}
