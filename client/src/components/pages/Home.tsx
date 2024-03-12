import ChatBox from "../modules/ChatBox/ChatBox";
import VisBox from "../modules/VisBox/VisBox";
import { useState } from "react";
import { MessageType } from "../../types";
import { VisDataType } from "../../types";

const Home = () => {
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
          messages={messages}
          setMessages={setMessages}
        />
        <VisBox visHis={visHis} />
      </div>
    </div>
  );
};

export default Home;
