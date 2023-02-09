'use client'

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, Firestore, serverTimestamp } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { db } from "../firebase";


type Props = {
    chatId: string
};

type Message = {
    text: string
    createdAt: Firestore.Timestamp,p
    id: string
}


async function ChatInput({ chatId }: Props) {

    //use swr to get the model
    const model = 'davinci'

    const [prompt, setPrompt] = useState('')
    const sendMessage = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!prompt) return

        const input = prompt.trim();
        setPrompt('')

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            id: '',
        }
    }

    await addDoc(collection(db, 'chats', chatId, 'messages'), message)

    //toast notification

    await fetch('/api/askquestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: input,
                chatId,
                model
            }),
        }).then(() => {
            //toast notification
        })
        

    

    
return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm focus:outline-none">
        <form 
            className="p-5 space-x-5 flex"
            onSubmit={sendMessage}
        >
            <input
                type="text"
                className="bg-transparent flex-1 outline-none disabled:cursor-not-allowed disabled:text-gray-300"
                placeholder="Type your message here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button
                type="submit"
                className='bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-slate-300 disabled:cursor-not-allowed'
                disabled={!prompt}
            >
                <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
            </button>
        </form>

        <div>
            {/* model slection */}
        </div>

    </div>
  )
}

export default ChatInput