import { useQuery } from "@tanstack/react-query";

import API from "@/utils/axios";
import { APIError, event } from "@/types";

const getEventDetails = async (
  id: string | undefined
): Promise<event | null> => {
  const res = await API.get(`/event/${id}`);

  return res.data?.data;
};

export const useEventDetails = (id: string | undefined) => {
  return useQuery<event | null, APIError>({
    queryKey: ["getEvent", id],
    queryFn: () => getEventDetails(id),
    retry: 2,
    enabled: !!id,
  });
};
