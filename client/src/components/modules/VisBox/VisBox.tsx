import { VegaLite } from "react-vega";
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visData: any;
}

const VisBox = ({ visData }: Props) => {
  console.log(visData);
  return (
    <section className="w-7/12 h-full ml-auto bg-white rounded-md flex flex-col divide-y divide-slate-400">
      <p className="flex-none py-2 text-14 ml-2 font-semibold text-red-200">
        Visualization
      </p>
      <div className="grow">
        {visData && (
          <VegaLite
            spec={{
              ...visData.response.visList[0].vlSpec,
              resize: true,
              autosize: "fit",
              width: 500,
              height: 400,
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
        )}
      </div>
    </section>
  );
};

export default VisBox;
