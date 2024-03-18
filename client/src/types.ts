/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MessageType {
  content: string;
  isUser: boolean;
}

export interface VisDataType {
  data: Nl4dvResType | null;
  resolvePending: ResolvePendingType | null;
}

export interface Nl4dvResType {
  message: string;
  response: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visList: Array<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ambiguity: any;
    dialogId: any;
    queryId: any;
  };
}

export interface ResolvePendingType {
  valuePending: boolean;
  attributePending: boolean;
  valueAmbiguityList: Array<string>;
  attributeAmbiguityList: Array<string>;
  index: number;
  type: string;
  ambiguityResponse: AmbiguityResponseType;
}

export interface AmbiguityResponseType {
  dialog_id: string;
  query_id: string;
  attribute: any;
  value: any;
}