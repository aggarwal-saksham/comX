import { RootState } from "@/state/store";
import { User as UserIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserControlBox() {
  const user = useSelector((state: RootState) => state.userDetails);

  return (
    <div className="h-14 bg-gray-100 flex items-center px-2 space-x-2 border-t">
      <Link
        to={user.user?.username ? `/profile/${user.user.username}` : "#"}
        className="flex items-center space-x-2 flex-grow overflow-hidden hover:opacity-80 transition-opacity"
      >
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarImage
            src={user.user?.avatar || "https://github.com/shadcn.png"}
            alt={user.user?.name || "User"}
          />
          <AvatarFallback className="text-xs">
            <UserIcon className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-grow min-w-0">
          <div className="text-sm font-semibold truncate">
            {user.user?.username}
          </div>
          <div className="text-xs text-gray-500 truncate">{user.user?.name}</div>
        </div>
      </Link>
    </div>
  );
}
