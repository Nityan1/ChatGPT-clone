import OpenAI from "openai";

const configuration = {
  apiKey: process.env.REACT_APP_API_KEY,
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
