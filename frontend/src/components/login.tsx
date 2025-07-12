import { Button, Card, CardBody, Input, Form, addToast } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";

import { useLogin } from "@/hooks/useLogin";
import { LoginInput } from "@/types";

const Login = () => {
  const { handleSubmit, control } = useForm<LoginInput>();
  const mutation = useLogin();
  const onSubmit = (data: LoginInput) => {
    mutation.mutate(data, {
      onSuccess: (res) => {
        addToast({
          title: res.message,
        });
      },
      onError: (err: Error) => {
        addToast({
          title: err.message || "Login failed",
        });
      },
    });
  };

  return (
    <div className="bg-black flex justify-center items-center h-screen">
      <Card className="dark min-w-[20rem]">
        <CardBody>
          <div className="flex flex-col gap-3">
            <h1>Continue with just email (Guest login)</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="email"
                render={({
                  field: { name, value, onChange, onBlur, ref },
                  fieldState: { invalid, error },
                }) => (
                  <Input
                    ref={ref}
                    isRequired
                    errorMessage={error?.message}
                    validationBehavior="aria"
                    isInvalid={invalid}
                    label="Email"
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                )}
                rules={{
                  required: "Email is required.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address.",
                  },
                }}
              />
              <Button fullWidth type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
