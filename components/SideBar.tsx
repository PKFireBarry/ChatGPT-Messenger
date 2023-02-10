'use client'

import {useCollection} from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from "firebase/firestore"
import NewChat from "./NewChat"
import { db } from '../firebase'
import ChatRow from "./ChatRow"
import ModelSelection from './ModelSelection'
import Link from 'next/link'
import { HomeIcon } from '@heroicons/react/24/outline'



function SideBar() {

  const [chats, loading, error] = useCollection(
    query(collection(db, 'chats')
    )
  );

  console.log(chats)

  return (
    <div className="p-2 flex flex-col h-screen">
        <div className="flex-1">
            <div> 
              <div className='flex justify-between my-2 mx-2'>
                <Link
                  className='text-2xl font-bold text-gray-400'  
                  href='/'>
                  <HomeIcon className='h-8 w-8 text-gray-400' />
                </Link>
                <a className='text-2xl font-bold text-gray-400 border border-white rounded-lg p-0' href='https://github.com/PKFireBarry'
                  target='_blank'>Github</a>
              </div>
                <div className='sm:inline hidden my-2'>

                    <ModelSelection />
                </div>
              
                <NewChat />


                <div
                  className='felx flex-col space-y-2 my-2'
                >

                {loading && <p className='animate-pulse text-gray-400 text-center'
                  >Loading Chats...</p>}

                {chats?.docs.map(chat => (
                    <ChatRow 
                      key={chat.id}
                      id={chat.id} />))}
                      
                </div>

            </div>
            {/*a way to go back to the home page that is fixed to the buttom of the page*/}
        </div>
    </div>
  )
}

export default SideBar