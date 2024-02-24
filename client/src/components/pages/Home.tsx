import ChatBox from "../modules/ChatBox/ChatBox";
import VisBox from "../modules/VisBox/VisBox";
import { useState } from "react";

export interface MessageType {
  content: string;
  isUser: boolean;
}

const Home = () => {
  const [visData, setVisData] = useState(null);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState(Array<MessageType>);

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-black font-semibold p-2 text-36 mb-3 flex items-center justify-center">
        Natural Language to Ranker Visualization
      </h1>
      <div className="flex w-full items-center h-[700px]">
        <ChatBox setVisData={setVisData} setQuery={setQuery} query={query} messages={messages} setMessages={setMessages} />
        <VisBox visData={visData} />
      </div>
    </div>
  );
};

export default Home;
