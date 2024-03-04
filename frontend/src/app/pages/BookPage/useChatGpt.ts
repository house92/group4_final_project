// import { useRunChatGptQueryQuery } from 'generated/graphql';
import { OpenAI } from 'openai';
import { getChatGptApiKey, getGQLOrigin } from '../../../environment';

let openai: OpenAI;

interface ChatGptResponse {
    index: number;
    message: {
        role: string | null;
        content: string | null;
    };
    logprobs: null | any;
    finish_reason: string | null;
}

export async function runGpt(book: string, reviewer: number): Promise<string> {
    console.log(getChatGptApiKey());

    if (openai == null) {
        openai = new OpenAI({
            apiKey: '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',
            dangerouslyAllowBrowser: true,
        });
    }

    let setup = '';

    switch (reviewer) {
        case 0:
            setup =
                'You are Mary Poppins. Speak in the same manner that she does in the film Mary Poppins and include references to the film. Make sure to include a rating out of 5 at the end.';
            break;
        case 1:
            setup =
                'You are a man obsessed with baseball, fitting into almost every sentence. Make sure to include a rating out of 5 at the end.';
            break;
        case 2:
            setup =
                'You are a caveman who can barely speak english. Make sure to include a rating out of 5 at the end.';
            break;
        case 3:
            setup =
                'You are Popeye the Sailor man. You speak the same way that he does in the cartoons and you include many references to episodes of the cartoon. Make sure to include a rating out of 5 at the end.';
            break;
        default:
            setup =
                'You are Mary Poppins. Speak in her manner of speaking, including references to the film Mary Poppins. Make sure to use indentation and paragraphs to make it easier to ready, and make sure to include a rating out of 5 at the end.';
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
    if (response.message.content) {
        return response.message.content;
    } else {
        return 'Bad Response.';
    }
}

// async function main() {
//     console.log(await runGpt('Frankenstein', 2));
// }
// main();
