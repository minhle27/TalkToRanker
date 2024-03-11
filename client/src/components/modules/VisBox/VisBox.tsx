import VisContent from "./VisContent";
import { VisDataType } from "../../pages/Home";
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visHis: Array<VisDataType>
}

const VisBox = ({ visHis }: Props) => {
  return (
    <section className="w-7/12 h-full ml-auto bg-white rounded-md flex flex-col divide-y divide-slate-400">
      <p className="flex-none py-2 text-14 ml-2 font-semibold text-red-200">
        Visualization
      </p>
      <VisContent visHis={visHis} />
    </section>
  );
};

export default VisBox;
