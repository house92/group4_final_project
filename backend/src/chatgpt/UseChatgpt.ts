import { OpenAI } from 'openai';
import { getChatGptApiKey } from '../../environment';

const openai = new OpenAI({ apiKey: getChatGptApiKey() });

interface ChatGptResponse {
    index: number;
    message: {
        role: string;
        content: string;
    };
    logprobs: null | any;
    finish_reason: string;
}

export async function runGpt(book: string, reviewer: number) {
    let setup = '';

    switch (reviewer) {
        case 0:
            setup = 'You are Robert Downey Jr if he was alive in the year 1800.';
            break;
        case 1:
            setup = 'You are a man obsessed with baseball, fitting it into conversations anywhere you can.';
            break;
        case 2:
            setup = 'You are a caveman who can barely speak english.';
            break;
        default:
            setup =
                'You are Mary Poppins. Speak in her manner of speaking, including references to the film Mary Poppins.';
    }
    const prompt = 'Write me a two-paragraph review of ' + book;

    const completion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: setup },
            { role: 'user', content: prompt },
        ],
        model: 'gpt-3.5-turbo',
    });

    return getContentFromResponse(completion.choices[0]);
}

function getContentFromResponse(response: ChatGptResponse): string {
    return response.message.content;
}

async function main() {
    console.log(await runGpt('Frankenstein', 2));
}
main();