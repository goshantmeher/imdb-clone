import { useDispatch, useSelector } from "react-redux";
import { setUser, userState } from "@/redux/reducer/user";
import { LoginDialog } from "../auth";
import { useEffect } from "react";
import { getLoggedInUserApi } from "@/api/user/userApi";
import LogoutButton from "../auth/logout";
import { Link } from "react-router";

function NavBar() {
  const user = useSelector(userState);
  const dispatch = useDispatch();
  useEffect(() => {
    getLoggedInUserApi().then((result) => {
      if (result.success) {
        const user = result.data;
        dispatch(setUser(user));
      }
    });
  }, [dispatch]);

  return (
    <header className="bg-background/90 text-white px-4 py-2 max-h-[50px] sticky top-0 z-10">
      <nav className="flex justify-between items-center ">
        <Link to="/">
          <div className="text-lg font-bold">IMDB Clone</div>
        </Link>
        <ul className="flex space-x-4">
          {!user._id && (
            <li>
              <LoginDialog />
            </li>
          )}
          {user._id && (
            <li>
              <LogoutButton />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
