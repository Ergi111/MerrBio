import { IUser } from "../../types/user";
import { UserAvatar } from "../user/UserAvatar";

interface RecentUserProps {
  user: IUser;
  onSelectUser: () => void;
}

export const RecentUser = ({ user, onSelectUser }: RecentUserProps) => {
  return (
    <button
      onClick={onSelectUser}
      className="flex items-center gap-3 p-2 hover:bg-accent cursor-pointer w-full"
    >
      <UserAvatar name={user.fullName} id={user.id} />
      <div className="flex flex-col">
        <p>{user.fullName}</p>
        <p className="text-left">
          {user.role.slice(0, 1) + user.role.slice(1).toLocaleLowerCase()}
        </p>
      </div>
    </button>
  );
};
