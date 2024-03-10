/* eslint-disable prettier/prettier */
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ChatGptService } from './chatgpt.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { ChatGpt } from './chatgpt.entity';
import { BooksService } from 'src/books/books.service';

@Resolver(() => ChatGpt)
export class ChatGptResolver {
    constructor(private readonly service: ChatGptService, private readonly bookService: BooksService) {}

    ////////////////////////////////
    // QUERIES
    ////////////////////////////////

    @Public()
    @Query(() => String)
    async generateReview(@Args('reviewer', { type: () => Int }) reviewer: number, @Args('bookId') bookId: string): Promise<string> {
        const { title: bookTitle } = await this.bookService.findById(bookId);
        return await this.service.callChatGpt(reviewer, bookTitle);
    }

}
