import { Button, Form, Input } from "@heroui/react";
import { Controller } from "react-hook-form";

import { loginCardProps } from "@/types";

const LoginCard = ({ handleSubmit, onSubmit, control }: loginCardProps) => {
  return (
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
  );
};

export default LoginCard;
