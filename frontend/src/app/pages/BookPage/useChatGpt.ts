import { useRunChatGptQueryLazyQuery } from 'generated/graphql';

export async function useChatGpt(bookTitle: string, reviewer: number): Promise<string> {
    const [chatGptCall, { loading, error, data }] = useRunChatGptQueryLazyQuery({ variables: { reviewer, bookTitle } });

    if (data?.runChatGptQuery) {
        return data.runChatGptQuery;
    } else {
        return "Hasn't read it yet.";
    }
}
