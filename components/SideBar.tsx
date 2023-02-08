'use client'

import {useCollection} from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from "firebase/firestore"
import NewChat from "./NewChat"
import { db } from '../firebase'
import ChatRow from "./ChatRow"



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
                <div>
                    {/*model selector*/}
                </div>
                {/*chat list*/}
                {chats?.docs.map(chat => (
                    <ChatRow key={chat.id} id={chat.id} />
                )
                )}
                
            </div>
        </div>
    </div>
  )
}

export default SideBar