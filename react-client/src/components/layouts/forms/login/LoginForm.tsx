import React from "react";
import { useNavigate } from "react-router";

interface PLoginForm {
  loginFormValues: {
    email: string;
    password: string;
  };
  setLoginFromValues: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<PLoginForm> = ({
  onSubmit,
  loginFormValues,
  setLoginFromValues,
}) => {
  const navigate = useNavigate();
  return (
    <form onSubmit={onSubmit}>
      <div className="input-container">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          value={loginFormValues.email}
          onChange={(e) =>
            setLoginFromValues((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={loginFormValues.password}
          onChange={(e) =>
            setLoginFromValues((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <button
          type="submit"
          className="btn btn-primary font-dm-sans text-lg text-white w-full"
        >
          Login
        </button>
        <div>
          <p className="text-center font-dm-sans text-[#6e7179]">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="px-2 text-primary underline-offset-2 hover:underline"
            >
              Get Started
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
