import React from "react";
import { useNavigate } from "react-router";

interface PRegisterForm {
  registerFormValues: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  setRegisterFormValues: React.Dispatch<
    React.SetStateAction<{
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    }>
  >;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterForm: React.FC<PRegisterForm> = ({
  registerFormValues,
  setRegisterFormValues,
  onSubmit,
}) => {
  const navigate = useNavigate();

  return (
    <form onSubmit={onSubmit}>
      <div className="input-container">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={registerFormValues.username}
          onChange={(e) =>
            setRegisterFormValues((prev) => {
              return { ...prev, username: e.target.value };
            })
          }
        />
      </div>
      <div className="input-container">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={registerFormValues.email}
          onChange={(e) =>
            setRegisterFormValues((prev) => {
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
          value={registerFormValues.password}
          onChange={(e) =>
            setRegisterFormValues((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Confirm Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={registerFormValues.confirmPassword}
          onChange={(e) =>
            setRegisterFormValues((prev) => {
              return { ...prev, confirmPassword: e.target.value };
            })
          }
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <button
          type="submit"
          className="btn btn-primary font-dm-sans text-lg text-white w-full"
        >
          Register
        </button>
        <div>
          <p className="text-center font-dm-sans text-[#6e7179]">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="px-2 text-primary underline-offset-2 hover:underline"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
