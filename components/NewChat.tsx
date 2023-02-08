'use client'

import { PlusIcon } from '@heroicons/react/24/outline'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import {useRouter} from 'next/navigation'
import { db } from '../firebase'



function NewChat() {
  const router = useRouter()
  const createNewChat = async() => {

    const doc = await addDoc(
      collection(
        db, 'chats'
        ),{
          messages: [],
          createdAt: serverTimestamp()
        }
      )
      router.push(`/chats/${doc.id}`)
  };



  return (
    <div  
        className='border-gray-700 border items-center chatRow'
        onClick={createNewChat}
    >
        <PlusIcon className='h-4 w-4' />
        <p className=''>New Chat</p>
    </div>
  )
}

export default NewChat