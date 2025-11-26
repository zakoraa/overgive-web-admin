import { useRouter } from "next/navigation";
import { logoutUser } from "../services/logout-service";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    await logoutUser();
    router.replace("/login");
  };

  return logout;
}
