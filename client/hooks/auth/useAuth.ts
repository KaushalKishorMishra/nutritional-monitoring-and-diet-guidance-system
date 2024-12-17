import { useAuth } from "@/auth/authContext";

export const useAuthHook = () => {
  const { user, login, logout } = useAuth();
  return { user, login, logout };
};
