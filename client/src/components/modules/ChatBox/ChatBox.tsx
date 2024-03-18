import queriesService from "../../../services/queries";
import { getErrorMessage } from "../../../utils";
import Message from "./Message";
import { MessageType } from "../../../types";
import { useContext, useState } from "react";
import QueryContext from "../../../state/QueryContext";
import { Nl4dvResType } from "../../../types";
interface Props {
  messages: Array<MessageType>;
  setMessages: React.Dispatch<React.SetStateAction<Array<MessageType>>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getUnresolvedAmbiguities = (ambiguityObj: any) => {
  const ambList: string[] = [];
  Object.keys(ambiguityObj).forEach(function (ambiguousKeyword) {
    if (!ambiguityObj[ambiguousKeyword]["selected"]) {
      if (
        ambiguityObj[ambiguousKeyword]["selected"] !==
        "NL4DV_Resolved"
      ) {
        ambList.push(ambiguousKeyword)
      }
    }
  });
  console.log(ambList);
  return ambList;
};

const ChatBox = ({ messages, setMessages }: Props) => {
  const { visHis, setVisHis } = useContext(QueryContext);
  const [query, setQuery] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const model_response = `TTM reponds to query: ${query}`;
    setMessages([
      ...messages,
      { content: query, isUser: true },
      { content: model_response, isUser: false },
    ]);
    setQuery("");
    try {
      const nl4dvRes = (await queriesService.getVis(query)) as Nl4dvResType;
      console.log(nl4dvRes);
      const attributeAmbiguityList = getUnresolvedAmbiguities(
        nl4dvRes.response.ambiguity["attribute"]
      );
      const valueAmbiguityList = getUnresolvedAmbiguities(
        nl4dvRes.response.ambiguity["value"]
      );
      let type;
      if (attributeAmbiguityList.length > 0) {
        type = "attribute";
      } else if (valueAmbiguityList.length > 0) {
        type = "value";
      } else {
        type = "none";
      }

      const resolvePending = {
        valuePending: valueAmbiguityList.length > 0,
        attributePending: attributeAmbiguityList.length > 0,
        valueAmbiguityList,
        attributeAmbiguityList,
        index: 0,
        type,
        ambiguityResponse: {
          dialog_id: nl4dvRes.response["dialogId"].toString(),
          query_id: nl4dvRes.response["queryId"].toString(),
          attribute: {},
          value: {},
        },
      };
      const newVisData = {
        data: nl4dvRes,
        resolvePending,
      };
      setVisHis([...visHis, newVisData]);
    } catch (e: unknown) {
      const message = getErrorMessage(e);
      setVisHis([...visHis, { data: null, resolvePending: null }]);
      console.log(message);
      console.log(e);
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
          className="m-4 w-4/5 py-[10px] pl-[10px] bg-red-100 rounded-md pr-2"
          placeholder="Enter what you want to visualize"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn-primary ml-auto m-4"
          disabled={!query}
          type="submit"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default ChatBox;
