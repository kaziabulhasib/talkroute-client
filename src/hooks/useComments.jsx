import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useComments = (id) => {
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: comments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      if (!id) {
        return [];
      }
      const res = await axiosSecure.get(`/comments/post/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  return [comments, refetch, isLoading, error];
};

export default useComments;
