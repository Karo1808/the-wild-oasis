import React, { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUser } from "./useUser";
import { Navigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("wild_oasis_admin@example.com");
  const [password, setPassword] = useState("password");
  const { login, isLoading } = useLogin();

  function handleSubmit(e: React.ChangeEvent) {
    e.preventDefault();
    if (!email || !password) return null;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={(e: React.ChangeEvent) => handleSubmit(e)}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          disabled={isLoading}
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e: React.ChangeEvent) => {
            const target = e.target as HTMLInputElement;
            setEmail(target.value);
          }}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          disabled={isLoading}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e: React.ChangeEvent) => {
            const target = e.target as HTMLInputElement;
            setPassword(target.value);
          }}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isLoading} size="large">
          {!isLoading ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
