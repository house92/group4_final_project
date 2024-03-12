import * as dotenv from 'dotenv';
dotenv.config();

export function getChatGptApiKey() {
    return process.env.OPENAI_API_KEY;
}
