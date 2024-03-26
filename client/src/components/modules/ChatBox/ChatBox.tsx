import queriesService from "../../../services/queries";
import { getErrorMessage } from "../../../utils";
import Message from "./Message";
import { MessageType } from "../../pages/Home";

interface Props {
  setVisData: React.Dispatch<React.SetStateAction<null>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  messages: Array<MessageType>;
  setMessages: React.Dispatch<React.SetStateAction<Array<MessageType>>>;
}

const ChatBox = ({
  setVisData,
  query,
  setQuery,
  messages,
  setMessages,
}: Props) => {
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const model_response = `Visualizing: ${query}`;
    setMessages([
      ...messages,
      { content: query, isUser: true },
      { content: model_response, isUser: false },
    ]);
    setQuery("");
    try {
      const data = await queriesService.getVis(query);
      console.log(data.message)
      const extractedText = data.message.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]*>/g, '');
      const formatText = extractedText.replace(/([^\n]+)\n([0-9a-f]+)$/i, '$1');
      //const strippedText = data.message.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]*>/g, '');
      setMessages([
        ...messages,
        { content: query, isUser: true },
        { content: model_response, isUser: false },
        { content: formatText, isUser: false },
      ]);
      setVisData(data);
    } catch (e: unknown) {
      const message = getErrorMessage(e);
      setVisData(null);
      console.log(message);
    }
  };

  return (
    <section className="w-2/5 h-full bg-white rounded-md flex flex-col divide-y divide-slate-400">
      <p className="flex-none py-2 text-14 ml-2 font-semibold text-red-200">
        TalkToRanker
      </p>
      <section className="grow overflow-y-scroll overflow-x-hidden px-4 py-1 flex flex-col">
        {messages.map((msg, id) => {
          return <Message key={id} message={msg} />;
        })}
      </section>
      <form className="flex flex-none" onSubmit={handleSubmit}>
        <input
          className="m-4 w-4/5 py-[10px] pl-[10px] bg-red-100 rounded-md"
          placeholder="Enter what you want to visualize"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn-primary ml-auto m-4" type="submit">
          Send
        </button>
      </form>
    </section>
  );
};

export default ChatBox;
