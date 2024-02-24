const ChatBox = () => {
  return (
    <section className="w-2/5 h-full bg-white rounded-md flex flex-col divide-y divide-slate-400">
      <p className="flex-none py-2 text-14 ml-2 font-semibold text-red-200">
        TalkToRanker
      </p>
      <div className="grow">

      </div>
      <div className="flex flex-none">
        <input
          className="m-4 w-4/5 py-[10px] pl-[10px] bg-red-100 rounded-md"
          placeholder="Enter a question to visualize"
        />
        <button className="btn-primary ml-auto m-4" type="submit">
          Send
        </button>
      </div>
    </section>
  );
};

export default ChatBox;
