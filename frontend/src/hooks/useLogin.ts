import { useMutation } from "@tanstack/react-query";

import { LoginInput, response } from "@/types";
import API from "@/utils/axios";

const LoginFunction = async (email: string): Promise<response> => {
  const response = await API.post(`/login`, {
    email,
  });

  return response.data;
};

export const useLogin = () => {
  return useMutation<response, Error, LoginInput>({
    mutationFn: async ({ email }) => LoginFunction(email),
  });
};
