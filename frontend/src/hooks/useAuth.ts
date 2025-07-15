import { useQuery } from "@tanstack/react-query";

import API from "@/utils/axios";

export const useAuth = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => await API.get(`/me`),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
