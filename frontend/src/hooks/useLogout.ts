import { useMutation } from "@tanstack/react-query";

import API from "@/utils/axios";
import { APIError, response } from "@/types";

const Logout = async (): Promise<response> => {
  const response = await API.post(`/logout`);

  return response.data;
};

export const useLogout = () => {
  return useMutation<response, APIError, undefined>({
    mutationFn: Logout,
  });
};
