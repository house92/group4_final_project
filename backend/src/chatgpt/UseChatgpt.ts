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

export interface FetchedAuthorData {
    name: string;
    bio: string;
    hometown: string;
}

export interface BulkAuthorsReturn {
    authors: FetchedAuthorData[];
}

export async function getAuthorData(names: string[]): Promise<BulkAuthorsReturn> {
    let s =
        'Please create an array with one JSON for each of the authors in this list that contains their name as "name" (which is the inputted name), a "bio" (one-paragraph biography of the author), and a "hometown" (the home town of the author). The array is: ';
    s += names;
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: 'You are a helpful assistant designed to output JSON.',
            },
            {
                role: 'user',
                content: s,
            },
        ],
        model: 'gpt-3.5-turbo',
        response_format: { type: 'json_object' },
    });

    const parsedObject: BulkAuthorsReturn = JSON.parse(completion.choices[0].message.content);

    return parsedObject;
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

// async function main() {
//     console.log(await runGpt('Frankenstein', 2));
// }
// main();
