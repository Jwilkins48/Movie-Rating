import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs } from "./Tabs";
import useLocalStorage from "../hooks/useLocalStorage";

export function Navbar() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [active, setActive] = useLocalStorage("active", []);

  //Update nav after logout
  useEffect(() => {
    auth.currentUser ? setLoggedIn(true) : setLoggedIn(false);
  }, [auth.currentUser, loggedIn]);

  //Close daisy dropdown tab on click
  const handleClick = (path: string) => {
    const elem = document.activeElement;
    if (elem) {
      (elem as HTMLElement).blur();
    }
    navigate(path);
  };

  const onLogout = () => {
    auth.signOut();
    setLoggedIn(false);
    handleClick("/sign-in");
    alert("Signed Out!");
  };

  return (
    <div>
      <nav className="flex justify-between pt-[1rem] px-2 items-center bg-neutral h-20">
        <div>
          <Link
            //Set active tab to home
            onClick={() => setActive(0)}
            to="/"
            className="text-3xl text-secondary title"
          >
            Movie Night
          </Link>
        </div>

        <div>
          {auth.currentUser ? (
            <div>
              <div className="dropdown dropdown-end">
                <button
                  onClick={() => setDropdown(!dropdown)}
                  tabIndex={0}
                  className="hover:bg-neutral-focus hover:rounded-xl mb-2 pt-2 px-3 m-1 ml-6 name text-primary font-bold"
                >
                  <p className="mb-4 text-lg">{auth.currentUser.displayName}</p>
                </button>
                <ul
                  tabIndex={0}
                  className={
                    dropdown
                      ? "dropdown-content bg-primary menu p-2 shadow bg-base-100 rounded-box w-52"
                      : "hidden"
                  }
                >
                  <li onClick={() => handleClick("/profile")}>
                    <p className="font-bold">Profile</p>
                  </li>
                  <li>
                    <button
                      className="text-[15px] text- font-bold"
                      onClick={onLogout}
                    >
                      LogOut
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/sign-in" className="text-[15px] text-primary  btn">
              Sign In
            </Link>
          )}
        </div>
      </nav>
      <Tabs active={active} setActive={setActive} />
    </div>
  );
}
