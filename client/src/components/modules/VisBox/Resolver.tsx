import { useContext, useState } from "react";
import { VisDataType } from "../../../types";
import { Nl4dvResType } from "../../../types";
import queriesService from "../../../services/queries";
import { AmbiguityResponseType } from "../../../types";
import QueryContext from "../../../state/QueryContext";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  visData: VisDataType;
}

const getResolveOptions = (
  data: Nl4dvResType,
  keyword: string,
  type: string
) => {
  if (data) {
    return data.response.ambiguity[type][keyword]["options"];
  }
};

const Resolver = ({ visData }: Props) => {
  const [chosen, setChosen] = useState("");
  const { visHis, setVisHis } = useContext(QueryContext);

  const data = visData.data;
  const pending = visData.resolvePending;
  if (!pending || !data) return;
  const type = pending.type;
  const index = pending.index;
  const ambList =
    type === "value"
      ? pending.valueAmbiguityList
      : pending.attributeAmbiguityList;
  const keyword = ambList[index];

  const resolveOptions = getResolveOptions(data, keyword, type);
  console.log("ResolveOptions: ", resolveOptions);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // update ambRes
    const newAmbRes = { ...pending.ambiguityResponse };
    newAmbRes[type as keyof AmbiguityResponseType][keyword] = chosen;

    // update visHis
    const newVisData = {
      data,
      resolvePending: {
        ...pending,
        ambiguityResponse: newAmbRes,
      },
    };
    if (index === ambList.length - 1) {
      const pendingType = type === "value" ? "valuePending" : "attributePending";
      newVisData.resolvePending[pendingType] = false;
      if (
        !newVisData.resolvePending.valuePending &&
        !newVisData.resolvePending.attributePending
      ) {
        const nl4dvRes = await queriesService.updateQuery(newAmbRes);
        newVisData.data = nl4dvRes;
      } else {
        const newType = type === "value" ? "attribute" : "value";
        newVisData.resolvePending.type = newType;
        newVisData.resolvePending.index = 0;
      }
    } else {
      newVisData.resolvePending.index++;
    }
    setVisHis([...visHis, newVisData]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          What did you mean by <b>{keyword}</b>
          <select value={chosen} onChange={(e) => setChosen(e.target.value)} required>
            {resolveOptions.map((each: any, id: number) => (
              <option value={each} key={id}>
                {each}
              </option>
            ))}
          </select>
          <button type="submit">Okay</button>
        </label>
      </form>
    </div>
  );
};

export default Resolver;
