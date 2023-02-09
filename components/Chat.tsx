type Props = {

  params: {
  id: string
  };
};

function Chat({ params: { id } }: Props) {
  return (
    <div
      className="flex-1"
    >
      Chat
    </div>
  )
}

export default Chat