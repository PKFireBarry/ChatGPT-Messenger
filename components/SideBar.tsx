'use client'

import {useCollection} from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from "firebase/firestore"
import NewChat from "./NewChat"
import { db } from '../firebase'
import ChatRow from "./ChatRow"
import ModelSelection from './ModelSelection'



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
                {/*new chats*/}
                <NewChat />
                <div className='hidden sm:inline'>
                    {/*model selector*/}
                    <ModelSelection />
                </div>

                <div
                  className='felx flex-col space-y-2 my-2'
                >

                {chats?.docs.map(chat => (
                    <ChatRow 
                      key={chat.id}
                      id={chat.id} />))}
                      
                </div>

            </div>
        </div>
    </div>
  )
}

export default SideBar