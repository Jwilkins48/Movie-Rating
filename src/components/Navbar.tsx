import { getAuth } from "firebase/auth";
// import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const auth = getAuth();
  const navigate = useNavigate();
  // const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   auth.currentUser ? setLoggedIn(true) : setLoggedIn(false);
  // }, [loggedIn]);

  const onLogout = () => {
    auth.signOut();
    navigate("/");
    alert("Signed Out!");
  };
  return (
    <nav className="flex justify-between px-3 pb-5 pt-3 items-center bg-neutral">
      <div>
        <Link to="/" className="text-3xl text-secondary">
          Movie Night
        </Link>
      </div>

      <div>
        {auth.currentUser ? (
          <button className="text-[15px] text-primary btn" onClick={onLogout}>
            LogOut
          </button>
        ) : (
          <Link to="/sign-in" className="text-[15px] text-primary btn">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
