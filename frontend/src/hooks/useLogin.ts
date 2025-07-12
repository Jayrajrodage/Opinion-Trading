import { useMutation } from "@tanstack/react-query";

import { LoginInput, LoginResponse } from "@/types";
import API from "@/utils/axios";

const LoginFunction = async (email: string): Promise<LoginResponse> => {
  const response = await API.post(`/login`, {
    email,
  });

  return response.data;
};

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: async ({ email }) => LoginFunction(email),
  });
};
