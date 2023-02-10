'use client'

import {query, collection, orderBy} from 'firebase/firestore';
import {useCollection} from 'react-firebase-hooks/firestore';
import {db} from '../firebase';
import Message from './Message';
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid';


type Props = {
  chatId: string;
};

function Chat({chatId}: Props ) {

  const [messages] = useCollection(
    query(collection(db, "chats", chatId, "messages"),
          orderBy("createdAt", "asc")
    ));

    return (
      <div
        className="flex-1 overflow-y-scroll scrollbar-thin scrollbar-track-gray-400 scrollbar-thumb-black"
      >
        {!messages?.docs.length && (
          <div>
          <p className="text-center font-bold text-gray-400 py-5 animate-pulse">
            Get started by sending a message!
          </p>
              <ArrowDownCircleIcon className="h-10 w-10 text-gray-400 mx-auto animate-bounce" />
          </div>
        )}
        {
          messages?.docs.map((message) => (
            <Message key={message.id} message={message.data()} />
          ))}
      </div>
    );
    
}

export default Chat