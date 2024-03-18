/* eslint-disable @typescript-eslint/no-explicit-any */
import { VegaLite } from "react-vega";
import { VisDataType } from "../../../types";
import { useContext } from "react";
import QueryContext from "../../../state/QueryContext";
import Resolver from "./Resolver";

const VisLog = ({ visData }: { visData: VisDataType }) => {
  if (visData.data) {
    return (
      <>
        <p>{visData.data.message}</p>
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
};

const VisContent = () => {
  const { visHis } = useContext(QueryContext);

  return (
    <div className="grow overflow-y-scroll overflow-x-hidden">
      <section className="grow px-4 py-1 flex flex-col">
        {visHis.map((visData, id) => {
          if (visData.data) {
            if (!visData.resolvePending?.valuePending && !visData.resolvePending?.attributePending) {
              return <VisLog key={id} visData={visData} />;
            } else {
              return <Resolver visData={visData} />
            }
          } else {
            return (
              <p className="text-center mt-4 text-red-500 font-bold">
                No thing to visualize
              </p>
            );
          }
        })}
      </section>
    </div>
  );
};

export default VisContent;
