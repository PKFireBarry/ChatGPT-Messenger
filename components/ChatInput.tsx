'use client';


import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { db } from "../firebase";
import useSWR from "swr";
import ModelSelection from "./ModelSelection";

type Props = {
  chatId: string;
};

function ChatInput({chatId}: Props ) {

  const [prompt, setPrompt] = useState("");

  //useSWR to get model
  const { data: model, mutate: setModel } = useSWR("model", { fallbackData: "text-davinci-003" });
  console.log(model);


  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");
    
    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      id: "User",
    }

    await addDoc(collection(db, "chats", chatId, "messages"), message);

    //toast notification

    const notification = toast.loading("ChatGPT is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input, chatId, model
      }),
  }).then(() => {
    //toast notification to say successfull
    toast.success("ChatGPT has responded!", {
      id: notification,
    });

  });
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg tetx-sm">
      <form
        className="flex p-5 space-x-5"
        onSubmit={sendMessage}
        >
        <input type="text"
        placeholder="Type a message"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="bg-transparent flex-1 focus:outline-none p-2 rounded-lg disabled:cursor-not-allowed disabled:text-gray-300"
        />
        <button 
          type="submit"
          disabled={!prompt}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
        </button>
      </form>
      <div>

      </div>
    </div>
  )
}

export default ChatInput