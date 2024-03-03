import { Injectable } from '@nestjs/common';
import { runGpt } from './UseChatgpt';

@Injectable()
export class ChatGptService {
    constructor() {}

    async callChatGpt(reviewer: number, bookTitle: string): Promise<string> {
        return await runGpt(bookTitle, reviewer);
    }
}
