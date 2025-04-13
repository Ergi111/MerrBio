import { Outlet } from "react-router";
import { useAuth } from "../../context/useAuth";
import { RecentUser } from "../../components/chat/RecentUser";
import { useGetUsers } from "../../services/useGetUsers";
import { useState } from "react";
import { Chat } from "../../components/chat/Chat";

export const ChatLayout = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const [selectUser, setSelectUser] = useState<string | null>(null);

  const { users, loading } = useGetUsers(currentUser?.id as string);
  return (
    <div className="relative">
      <Outlet />
      {isAuthenticated && (
        <div className="fixed bottom-0 right-0 mr-8 h-[80vh] bg-white w-80 rounded-t-md">
          {selectUser ? (
            <Chat selectedUserId={selectUser} />
          ) : (
            users?.map((user) => (
              <RecentUser
                key={user.id}
                user={user}
                onSelectUser={() => setSelectUser(user.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};
