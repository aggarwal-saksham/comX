import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar/Sidebar";

function CommunityLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-auto w-full bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default CommunityLayout;
