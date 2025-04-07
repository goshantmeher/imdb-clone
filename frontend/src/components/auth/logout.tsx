import { logoutApi } from "@/api/user/userApi";
import { useDispatch } from "react-redux";
import { clearUser } from "@/redux/reducer/user";
import { toast } from "sonner";
import { Button } from "../ui/button";

function LogoutButton() {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const result = await logoutApi();
    if (result.success) {
      dispatch(clearUser());
      toast.success("Logout successful");
    } else {
      toast.error(result.message);
    }
  };
  return (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
