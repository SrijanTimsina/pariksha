import { useAuth } from "@/utils/AuthContext";

export default function logout() {
  const { logout } = useAuth();
  return logout();
}
