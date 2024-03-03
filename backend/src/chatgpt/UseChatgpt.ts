import { OpenAI } from 'openai';
import { getChatGptApiKey } from '../../environment';

const openai = new OpenAI({ apiKey: getChatGptApiKey() });
