// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { prompt, chatId, model } = req.body

    if (!prompt || !model) {
        res.status(400).json({ answer: 'Please Provide a Prompt' })
        return
    }
    if (!chatId) {
        res.status(400).json({ answer: 'Please Provide a Chat ID' })
        return
    }

    //chatgpt query 

    const response = await query(prompt, model, chatId)
    
  res.status(200).json({ name: 'John Doe' })
}
