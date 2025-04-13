import { useEffect, useRef } from "react";
import { useGetMessages } from "../../services/useGetMessages";
import { IUser } from "../../types/user";
import { MessageComponent } from "./Message";

interface MessagesListProps {
  conversationId: string;
  selectedUser: IUser;
}

export const MessagesList = ({
  conversationId,
  selectedUser,
}: MessagesListProps) => {
  const { messages, loading } = useGetMessages(conversationId);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("MessagesList loading:", selectedUser);
  console.log("MessagesList messages:", messages);
  console.log("MessagesList conversationId:", conversationId);
  return (
    <div className="space-y-4 overflow-y-auto pl-0 p-4" ref={ref}>
      {messages.map((message) => (
        <MessageComponent key={message.id} msg={message} user={selectedUser} />
      ))}
    </div>
  );
};
