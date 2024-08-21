import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
});

const handleChatbotQuery = async (req: Request, res: Response) => {
    try {
        const { query } = req.body;

        const response = await openai.completions.create({
            model: 'text-davinci-003',
            prompt: `${initial_prompt}\nUser: ${query}`,
            max_tokens: 1024,
            n: 1,
            stop: null,
            temperature: 0.5,
        });

        const generatedResponse = response.choices[0].text?.trim();

        if (!generatedResponse) {
            return res.status(400).json({ message: 'Failed to generate a response' });
        }

        res.status(200).json({ response: generatedResponse });
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            console.error(error.status);
            console.error(error.message);
            console.error(error.code);
            console.error(error.type);
        } else {
            console.error('Error in chatbotController:', error);
        }
        res.status(500).json({ message: 'Error processing chatbot query' });
    }
};

const initial_prompt = ` You are a friendly and knowledgeable financial assistant. Analyze the given transaction data and respond to the user's query.  Provide your answer in the following format:  Answer: [Give a brief, friendly response to the user's question. Use simple terms and mention specific amounts and dates. Start with "So"]  Financial Tips: 1. [Provide a practical tip about tracking or managing spending. Suggest a simple tool or method, and explain why it's helpful.] 2. [Suggest setting financial goals related. Give an example or two of possible goals.] 3. [Offer a tip about ways to potentially increase holdings. Mention a specific method, but also remind the user to be cautious and do research.]  For each tip: - Keep it concise and actionable - Use a friendly, conversational tone as if chatting with a friend - Add a brief explanation or example to make it more relatable - End with a question or encouraging statement to engage the user  Avoid technical jargon and don't mention being an AI. `;

export default handleChatbotQuery;