import { Outlet } from "react-router";
import { useAuth } from "../../context/useAuth";
import { RecentUser } from "../../components/chat/RecentUser";
import { useGetUsers } from "../../services/useGetUsers";
import { useState } from "react";
import { Chat } from "../../components/chat/Chat";
import { ChevronUp, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IUser } from "../../types/user";

export const ChatLayout = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const [selectUser, setSelectUser] = useState<IUser | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const { users } = useGetUsers(currentUser?.id as string);
  console.log("ChatLayout users:", users);
  console.log(selectUser, "selectUser");
  return (
    <div className="relative">
      <Outlet />

      {isAuthenticated && (
        <div className="fixed bottom-0 right-0 mr-8 w-80 rounded-t-md bg-white shadow-lg border">
          {/* Header */}
          <div
            className="flex items-center justify-between p-2 cursor-pointer bg-gray-100 rounded-t-md"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <span className="font-semibold">
              {selectUser ? "Chat" : "Recent Users"}
            </span>
            <div className="flex items-center gap-2">
              {selectUser && (
                <X
                  size={18}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectUser(null);
                  }}
                />
              )}
              {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </div>
          </div>

          {/* Animated Content */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                key="chat"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "70vh", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="overflow-y-auto h-full">
                  {selectUser ? (
                    <Chat selectedUser={selectUser} />
                  ) : (
                    users?.map((user) => (
                      <RecentUser
                        key={user.id}
                        user={user}
                        onSelectUser={() => setSelectUser(user)}
                      />
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
