export interface MessageType {
  content: string;
  isUser: boolean;
}

export interface VisDataType {
  data: {
    response: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      visList: Array<any>;
    };
  };
  query: string;
}