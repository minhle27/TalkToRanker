import ChatBox from "../modules/ChatBox/ChatBox";
import VisBox from "../modules/VisBox/VisBox";

const Home = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-black font-semibold p-2 text-36 mb-3 flex items-center justify-center">
        Natural Language to Ranker Visualization
      </h1>
      <div className="flex w-full items-center h-[700px]">
        <ChatBox />
        <VisBox />
      </div>
    </div>
  );
};

export default Home;
