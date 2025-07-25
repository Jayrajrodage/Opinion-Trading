import {
  DrawerFooter,
  Popover,
  Spinner,
  PopoverTrigger,
  Button,
  PopoverContent,
  addToast,
} from "@heroui/react";
import { useForm } from "react-hook-form";

import LoginCard from "./loginCard";

import { useLogin } from "@/hooks/useLogin";
import { LoginInput, placeTradeFooterProps } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { useBalance } from "@/hooks/useBalance";

const PlaceTradeFooter = ({ isOpen, searchParams }: placeTradeFooterProps) => {
  const { isLoading, isError, isSuccess, refetch } = useAuth();
  const {
    isSuccess: isSuccessBalance,
    data,
    refetch: refetchBalance,
  } = useBalance();
  const { handleSubmit, control } = useForm<LoginInput>();
  const mutation = useLogin();

  const onSubmit = (data: LoginInput) => {
    mutation.mutate(data, {
      onSuccess: (res) => {
        addToast({
          title: res.message,
          color: "success",
        });
        localStorage.setItem("auth", "true");
        refetch();
        refetchBalance();
      },
      onError: (err: Error) => {
        addToast({
          title: err.message || "Login failed",
          color: "danger",
        });
      },
    });
  };

  return (
    <DrawerFooter className="flex flex-col justify-center">
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Popover placement="top">
          <PopoverTrigger>
            <Button>Login</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <LoginCard
                control={control}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
              />
            </div>
          </PopoverContent>
        </Popover>
      ) : isSuccess ? (
        <>
          <Button
            fullWidth
            size="lg"
            color={searchParams.get("kind") === "yes" ? "success" : "danger"}
          >
            Place Order
          </Button>
          <div className="text-sm text-center">
            Available Balance:{" "}
            {isSuccessBalance && <span>₹{data.availableBalance} </span>}
          </div>
        </>
      ) : (
        <div className="text-center text-red-500">Something went wrong!</div>
      )}
    </DrawerFooter>
  );
};

export default PlaceTradeFooter;
