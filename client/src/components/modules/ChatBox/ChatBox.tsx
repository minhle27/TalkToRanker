import queriesService from "../../../services/queries";
import { getErrorMessage } from "../../../utils";

interface Props {
  setVisData: React.Dispatch<React.SetStateAction<null>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const ChatBox = ({ setVisData, query, setQuery }: Props) => {
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await queriesService.getVis(query);
      setVisData(data);
      setQuery("");
    } catch (e: unknown) {
      const message = getErrorMessage(e);
      console.log(message);
    }
  };

  return (
    <section className="w-2/5 h-full bg-white rounded-md flex flex-col divide-y divide-slate-400">
      <p className="flex-none py-2 text-14 ml-2 font-semibold text-red-200">
        TalkToRanker
      </p>
      <div className="grow"></div>
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
