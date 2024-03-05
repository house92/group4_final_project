import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenAI } from 'openai';
import { ChatGptResolver } from './chatgpt.resolver';
import { ChatGptService } from './chatgpt.service';
import { BooksService } from 'src/books/books.service';
import { Book } from 'src/books/book.entity';
import { Author } from 'src/authors/author.entity';
import { AuthorsService } from 'src/authors/authors.service';

@Module({
    imports: [TypeOrmModule.forFeature([OpenAI, Book, Author])],
    providers: [ChatGptResolver, ChatGptService, BooksService, AuthorsService],

})
export class ChatGptModule {}
