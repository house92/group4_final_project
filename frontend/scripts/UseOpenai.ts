import OpenAI from "openai";

const openai = new OpenAI({apiKey: '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'});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the world series in 2020?"}],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}
main();