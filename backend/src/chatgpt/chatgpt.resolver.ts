/* eslint-disable prettier/prettier */
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ChatGptService } from './chatgpt.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { ChatGpt } from './chatgpt.entity';

@Resolver(() => ChatGpt)
export class ChatGptResolver {
    constructor(private readonly chatGptService: ChatGptService) {}

    ////////////////////////////////
    // QUERIES
    ////////////////////////////////

    @Public()
    @Query(() => String)
    async runChatGptQuery(@Args('reviewer', { type: () => Int }) reviewer: number, @Args('bookTitle') bookTitle: string): Promise<string> {
        return this.chatGptService.callChatGpt(reviewer, bookTitle);
    }

}
