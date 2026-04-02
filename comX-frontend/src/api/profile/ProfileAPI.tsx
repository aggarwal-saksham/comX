import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PublicProfile } from "@/types/UserProfile";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function ProfileAPI() {
  const { username } = useParams();

  const { data, isLoading, error } = useQuery<PublicProfile>({
    queryKey: [`user-info-${username}`],
    queryFn: async () => {
      const response = await axios.get(
        `${backend_url}/user/get-user-info/${username}`,
        { withCredentials: true }
      );

      return response.data.data;
    },
  });

  return {
    profile: data as PublicProfile,
    profileLoading: isLoading,
    profileError: error,
  };
}
