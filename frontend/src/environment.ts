export function getGQLOrigin() {
    return process.env.REACT_APP_BASE_API;
}

export function getChatGptApiKey() {
    console.log(process.env.OPENAI_API_KEY);
    console.log(process.env.REACT_APP_BASE_API);
    return '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';
}
