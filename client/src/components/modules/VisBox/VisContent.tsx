import { VegaLite } from "react-vega";
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visData: any;
}

const VisContent = ({ visData }: Props) => {
  return (
    <div className="grow">
      {visData && visData.response.visList.length ? (
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
      ) : <p className="text-center mt-4 text-red-500 font-bold">No thing to visualize</p>}
    </div>
  );
};

export default VisContent;
