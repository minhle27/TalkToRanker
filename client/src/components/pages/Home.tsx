import ChatBox from "../modules/ChatBox/ChatBox";
import VisBox from "../modules/VisBox/VisBox";
import { useState } from "react";

export interface MessageType {
  content: string;
  isUser: boolean;
}

export interface VisDataType {
  response: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visList: Array<any>;
  };
}

const Home = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState(Array<MessageType>);
  const [visHis, setVisHis] = useState(Array<VisDataType>);

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-black font-semibold p-2 text-36 mb-3 flex items-center justify-center">
        Natural Language to Ranker Visualization
      </h1>
      <div className="flex w-full items-center h-[700px]">
        <ChatBox
          visHis={visHis}
          setVisHis={setVisHis}
          setQuery={setQuery}
          query={query}
          messages={messages}
          setMessages={setMessages}
        />
        <VisBox visHis={visHis} />
      </div>
    </div>
  );
};

export default Home;
