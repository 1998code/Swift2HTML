import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const input = req.body.input;

    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: "```swift\n$" + input + "\n```\n\n# Convert to TailwindCSS. Body must in full screen (w-screen, h-screen), and use div to include content. System image use Fontawesome to replace. Add comment to explain code.\n\n```html\n<html>\n<head>\n</head>\n",
      suffix: "\n</html>\n```\n",
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const result = response.data.choices[0].text

    res.status(200).json({ result })
  } else {
    res.status(400).json({ error: 'Invalid method, please use POST instead.' })
  }
}
