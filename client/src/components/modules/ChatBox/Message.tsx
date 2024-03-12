import { MessageType } from "../../../types";

interface Props {
  message: MessageType;
}

const Message = ({ message }: Props) => {
  return (
    <div className={message.isUser ? "message own" : "message mr-auto"}>
      <p>
        {message.content}
      </p>
    </div>
  );
};

export default Message;
