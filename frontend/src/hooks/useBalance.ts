import { useMutation, useQuery } from "@tanstack/react-query";

import API from "@/utils/axios";
import { ApiError, APIError, balance, BalanceInput, response } from "@/types";

const getBalance = async (): Promise<balance> => {
  const res = await API.get(`/balance`);

  return res.data?.data;
};

export const useBalance = () => {
  return useQuery<balance, APIError>({
    queryKey: ["getBalance"],
    queryFn: getBalance,
    retry: 2,
  });
};

const updateBalance = async (amount: number): Promise<response> => {
  const response = await API.post(`/balance`, {
    amount,
  });

  return response.data;
};

export const useUpdateBalance = () => {
  return useMutation<response, ApiError, BalanceInput>({
    mutationFn: async ({ amount }) => updateBalance(amount),
  });
};
