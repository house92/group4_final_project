import { useRunChatGptQueryLazyQuery } from 'generated/graphql';

export async function useChatGpt(title: string, reviewer: number): Promise<string> {
    const [chatGptCall, { loading, error, data }] = useRunChatGptQueryLazyQuery({
        variables: { reviewer, bookTitle: title },
    });

    if (data?.runChatGptQuery) {
        return data.runChatGptQuery;
    } else {
        return "Hasn't read it yet.";
    }
}