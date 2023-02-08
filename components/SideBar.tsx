import NewChat from "./NewChat"


function SideBar() {
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
            </div>
        </div>
    </div>
  )
}

export default SideBar