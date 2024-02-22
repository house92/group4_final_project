import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Author } from 'src/authors/author.entity';
import { BookReview } from 'src/bookreviews/bookreview.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Book, Author, BookReview])],
    providers: [BooksResolver, BooksService],
})
export class BooksModule {}
