import { addToast, Card, CardBody } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import LoginCard from "./loginCard";

import { useLogin } from "@/hooks/useLogin";
import { LoginInput } from "@/types";

const Login = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
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
        window.location.href = from;
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
    <div className="bg-black flex justify-center items-center h-screen">
      <Card className="dark min-w-[20rem]">
        <CardBody>
          <LoginCard
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
