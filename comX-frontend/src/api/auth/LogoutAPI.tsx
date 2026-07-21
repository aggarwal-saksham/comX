import { clearUser } from "@/state/userDetails/userDetails";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function LogoutAPI() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    // Immediately clear local state and navigate to prevent any UI hang
    dispatch(clearUser());
    queryClient.clear();
    toast.success("Logged out successfully");
    navigate("/login");

    // Fire backend logout asynchronously
    axios
      .get(`${backend_url}/auth/logout`, {
        withCredentials: true,
      })
      .catch(() => {
        // Silently catch error since user is already logged out locally
      });
  };

  return {
    handleLogout,
    logoutPending: false,
  };
}
