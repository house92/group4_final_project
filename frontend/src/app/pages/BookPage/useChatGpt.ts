// import { useRunChatGptQueryQuery } from 'generated/graphql';

interface ChatGptResponse {
    index: number;
    message: {
        role: string | null;
        content: string | null;
    };
    logprobs: null | any;
    finish_reason: string | null;
}

// export default function useChatGpt(book: string, reviewer: number): Promise<string> {




// }