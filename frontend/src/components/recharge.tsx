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

import { WalletIcon } from "./icons";

import { BalanceInput, rechargeProps } from "@/types";
import { useUpdateBalance } from "@/hooks/useBalance";

const Recharge = ({ isOpen, onOpenChange }: rechargeProps) => {
  const { handleSubmit, control } = useForm<BalanceInput>({
    defaultValues: { amount: 50 },
  });
  const mutation = useUpdateBalance();
  const onSubmit = (data: BalanceInput) => {
    mutation.mutate(data, {
      onSuccess: (res) => {
        addToast({
          title: res.message,
          color: "success",
        });
      },
      onError: (err: Error) => {
        addToast({
          title: err.message || "update balance failed",
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
                    min: 1,
                    max: 1000000,
                  }}
                />
                <Button fullWidth type="submit">
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
