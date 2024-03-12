import VisContent from "./VisContent";

const VisBox = () => {
  return (
    <section className="w-7/12 h-full ml-auto bg-white rounded-md flex flex-col divide-y divide-slate-400">
      <p className="flex-none py-2 text-14 ml-2 font-semibold text-red-200">
        Visualization
      </p>
      <VisContent />
    </section>
  );
};

export default VisBox;
