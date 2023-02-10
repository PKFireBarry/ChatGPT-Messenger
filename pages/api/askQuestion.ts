// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { adminDb } from '../../firebaseAdmin'
import query from '../../lib/queryApi'
import {firestore} from 'firebase-admin'
import admin from 'firebase-admin'



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

    const response = await query(prompt, model)
    // LATER add chatId to response to be able to pull past answers to the frontend

    const message: Message = {
        text: response || 'Something went wrong with ChatGPT ',
        createdAt: admin.firestore.Timestamp.now(),
        id: 'ChatGPT',
    };

    // add message to firestore
    console.log('message', message, chatId)
    await adminDb.collection('chats').doc(chatId).collection('messages').add(message);

    res.status(200).json({ answer: message.text })
}
