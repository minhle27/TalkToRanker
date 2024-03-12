import "./App.css";
import Home from "./components/pages/Home";
import { QueryContextProvider } from "./state/QueryContext";

const App = () => {
  return (
    <div className="font-montserat overflow-y-auto overflow-x-hidden px-8 py-8 h-screen bg-white-200">
      <QueryContextProvider>
        <Home />
      </QueryContextProvider>
    </div>
  );
};

export default App;
