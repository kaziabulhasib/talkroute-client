import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useMyPost = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    refetch,
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/posts/user/${user.email}`);
        return res.data;
      }
      return [];
    },
    enabled: !!user?.email,
  });

  return [posts, refetch, isLoading, error];
};

export default useMyPost;
