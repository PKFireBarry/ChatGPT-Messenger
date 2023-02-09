import { DocumentData } from '@firebase/firestore';

type Props = {
    message: DocumentData;
};

function Message({message}: Props) {

    const isChatGPT = message.id === "ChatGPT";

  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#777b8a]"}`}>
        <div className='flex space-x-5 px-10 max-w-2xl mx-auto'>
            <p className='pt-1 text-sm'>{message.text}</p>
        </div>
    </div>
  )
}

export default Message