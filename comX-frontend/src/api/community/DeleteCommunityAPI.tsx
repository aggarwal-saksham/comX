import { RootState } from "@/state/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function DeleteCommunityAPI() {
  const { ID } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.userDetails);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `${backend_url}/community/delete-community`,
        {
          data: {
            communityId: parseInt(ID!, 10),
            userId: user.user?.id,
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["communityList"] });
      queryClient.invalidateQueries({ queryKey: [`communityList${user.user?.id}`] });
      queryClient.removeQueries({ queryKey: [`communityDetails/${ID}`] });
      toast.success("Community deleted successfully");
      navigate("/dashboard");
    },
    onError(error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Unable to delete community.";
        toast.error(errorMessage);
      } else {
        toast.error("Unable to delete community.");
      }
    },
  });

  return {
    handleDeleteCommunity: mutateAsync,
    deleteCommunityPending: isPending,
  };
}
