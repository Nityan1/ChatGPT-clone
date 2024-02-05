import OpenAI from "openai";

const configuration = {
  apiKey: "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",
    dangerouslyAllowBrowser: true,
};
const openai = new OpenAI(configuration);

export async function sendMsgToOpenAI(message) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
  });
  return completion.choices[0]?.message?.content;
}
