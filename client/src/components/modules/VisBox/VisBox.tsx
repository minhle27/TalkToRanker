import VisContent from "./VisContent";
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visData: any;
}

const VisBox = ({ visData }: Props) => {
  return (
    <section className="w-7/12 h-full ml-auto bg-white rounded-md flex flex-col divide-y divide-slate-400">
      <p className="flex-none py-2 text-14 ml-2 font-semibold text-red-200">
        Visualization
      </p>
      <VisContent visData={visData} />
    </section>
  );
};

export default VisBox;
