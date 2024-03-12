import { VegaLite } from "react-vega";
import { VisDataType } from "../../../types";
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visHis: Array<VisDataType>;
}

const VisLog = ({ visData }: { visData: VisDataType }) => {
  if (visData && visData.response.visList.length > 0) {
    return (
      <div className="m-2">
        <VegaLite
          spec={{
            ...visData.response.visList[0].vlSpec,
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
    );
  }
  return (
    <p className="text-center mt-4 text-red-500 font-bold">
      No thing to visualize
    </p>
  );
};

const VisContent = ({ visHis }: Props) => {
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
