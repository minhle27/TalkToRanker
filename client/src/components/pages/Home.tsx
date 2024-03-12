import ChatBox from "../modules/ChatBox/ChatBox";
import VisBox from "../modules/VisBox/VisBox";
import { useState } from "react";
import { MessageType } from "../../types";

const Home = () => {
  const [messages, setMessages] = useState(Array<MessageType>);

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-black font-semibold p-2 text-36 mb-3 flex items-center justify-center">
        Natural Language to Ranker Visualization
      </h1>
      <div className="flex w-full items-center h-[700px]">
        <ChatBox messages={messages} setMessages={setMessages} />
        <VisBox />
      </div>
    </div>
  );
};

export default Home;
