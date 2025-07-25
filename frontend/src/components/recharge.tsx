import {
  addToast,
  Button,
  Divider,
  Drawer,
  DrawerContent,
  DrawerHeader,
  Form,
  NumberInput,
} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { WalletIcon } from "./icons";

import { ApiError, BalanceInput, rechargeProps } from "@/types";
import { useUpdateBalance } from "@/hooks/useBalance";

const Recharge = ({ isOpen, onOpenChange, onClose }: rechargeProps) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<BalanceInput>({
    defaultValues: { amount: 50 },
    mode: "onChange",
  });
  const queryClient = useQueryClient();
  const mutation = useUpdateBalance();
  const onSubmit = (data: BalanceInput) => {
    mutation.mutate(data, {
      onSuccess: async (res) => {
        addToast({
          title: res.message,
          color: "success",
        });
        await queryClient.invalidateQueries({ queryKey: ["getBalance"] });
        onClose();
      },
      onError: (err: ApiError) => {
        addToast({
          title: err.response?.data.message[0] || "update balance failed",
          color: "danger",
        });
      },
    });
  };

  return (
    <Drawer
      className="w-full max-w-xl left-1/2 transform -translate-x-1/2 bottom-0 rounded-t-xl"
      placement="bottom"
      size="lg"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DrawerContent>
        {(_onClose) => (
          <>
            <DrawerHeader>
              <div className="flex gap-2 items-center justify-center">
                <WalletIcon />
                <h2 className="text-sm sm:text-base text-center">
                  Top Up Your Wallet
                </h2>
              </div>
            </DrawerHeader>
            <Divider />
            <div className="flex flex-col gap-4 p-4">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  control={control}
                  name="amount"
                  render={({
                    field: { name, value, onChange, onBlur, ref },
                    fieldState: { invalid, error },
                  }) => (
                    <NumberInput
                      ref={ref}
                      isRequired
                      hideStepper
                      errorMessage={error?.message}
                      validationBehavior="aria"
                      isInvalid={invalid}
                      label="Amount"
                      placeholder="Enter the amount"
                      radius="full"
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  )}
                  rules={{
                    required: "Amount is required.",
                    min: {
                      value: 50,
                      message: "Minimum amount is 50.",
                    },
                    max: {
                      value: 9999,
                      message: "Maximum amount is 9999.",
                    },
                  }}
                />
                <Button fullWidth isDisabled={!isValid} type="submit">
                  Recharge
                </Button>
              </Form>
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default Recharge;
