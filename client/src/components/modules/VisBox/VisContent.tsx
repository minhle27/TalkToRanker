import { VegaLite } from "react-vega";
import { VisDataType } from "../../../types";
import { useContext } from "react";
import QueryContext from "../../../state/QueryContext";

const VisLog = ({ visData }: { visData: VisDataType }) => {
  if (visData && visData.data.response.visList.length > 0) {
    return (
      <>
        <p>Visulizing query: {visData.query}</p>
        <div className="m-2">
          <VegaLite
            spec={{
              ...visData.data.response.visList[0].vlSpec,
              resize: true,
              autosize: "fit",
              width: 600,
              height: 500,
              background: "#fafafa",
            }}
            actions={{
              export: true,
              source: false,
              compiled: false,
              editor: true,
            }}
            downloadFileName={"Just Name It"}
          />
        </div>
      </>
    );
  }
  return (
    <p className="text-center mt-4 text-red-500 font-bold">
      No thing to visualize for query: {visData.query}
    </p>
  );
};

const VisContent = () => {
  const { visHis } = useContext(QueryContext);
  return (
    <div className="grow overflow-y-scroll overflow-x-hidden">
      <section className="grow px-4 py-1 flex flex-col">
        {visHis.map((visData, id) => {
          return <VisLog key={id} visData={visData} />;
        })}
      </section>
    </div>
  );
};

export default VisContent;
