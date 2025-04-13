import { Message } from "../../services/useGetMessages";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "../../context/useAuth";
import { cn } from "../../lib/utils";
import { IUser } from "../../types/user";

interface MessageProps {
  msg: Message;
  user: IUser;
}
export const MessageComponent = ({ msg, user }: MessageProps) => {
  const createdAtDate =
    msg.createdAt instanceof Timestamp ? msg.createdAt.toDate() : new Date();

  const formattedTime = createdAtDate.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const { currentUser } = useAuth();
  const me = msg.senderId === currentUser?.id;
  return (
    <div className={cn("flex gap-2", me && "justify-end")}>
      <div>
        <div className="flex items-center gap-2">
          <p>{me ? "You" : user.fullName}</p>
          <p className="text-xs">{formattedTime}</p>
        </div>
        <p
          className={cn(
            "p-2 rounded-md w-fit border",
            me ? " bg-[#008000] text-white ml-auto" : "bg-gray-300"
          )}
        >
          {msg.text}
        </p>
      </div>
    </div>
  );
};
