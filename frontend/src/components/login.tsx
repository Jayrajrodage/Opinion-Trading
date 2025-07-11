import { Button, Card, CardBody, Input, Form } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

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
