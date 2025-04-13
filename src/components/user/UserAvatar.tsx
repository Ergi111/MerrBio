import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface UserAvatarProps {
  name?: string;
  id?: string;
}

const makeRandomColor = (id?: string) => {
  if (!id) {
    return "hsl(0, 0%, 50%)";
  }
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

export const UserAvatar = ({ name, id }: UserAvatarProps) => {
  return (
    <Avatar>
      {/* <AvatarImage /> */}
      <AvatarFallback style={{ backgroundColor: makeRandomColor(id) }}>
        {name ? name[0].toUpperCase() : <User />}
      </AvatarFallback>
    </Avatar>
  );
};
