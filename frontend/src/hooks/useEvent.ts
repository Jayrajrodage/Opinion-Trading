import { useQuery } from "@tanstack/react-query";

import API from "@/utils/axios";
import { APIError, event } from "@/types";

const getEvents = async (): Promise<event[]> => {
  const res = await API.get(`/events`);

  return res.data?.data;
};

export const useEvents = () => {
  return useQuery<event[], APIError>({
    queryKey: ["getEvents"],
    queryFn: getEvents,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
