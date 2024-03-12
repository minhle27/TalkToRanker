import { createContext } from "react";
import { useState } from "react";

import { VisDataType } from "../types";

interface QueryContextValue {
  visHis: Array<VisDataType>;
  setVisHis: React.Dispatch<React.SetStateAction<Array<VisDataType>>>;
}

const QueryContext = createContext<QueryContextValue>({
  visHis: [],
  setVisHis() {},
});

export const QueryContextProvider = (props: { children: React.ReactNode }) => {
  const [visHis, setVisHis] = useState(Array<VisDataType>);

  return (
    <QueryContext.Provider value={{ visHis, setVisHis }}>
      {props.children}
    </QueryContext.Provider>
  );
};

export default QueryContext;
