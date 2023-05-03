// import { Auth } from "firebase/auth";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="flex justify-between px-3 pb-5 pt-3 items-center bg-neutral">
      <div>
        <Link to="/" className="text-3xl text-secondary">
          Movie Night
        </Link>
      </div>

      {/* No User Signed In */}
      <div>
        <Link to="/sign-in" className="text-lg text-primary">
          Sign In
        </Link>
      </div>

      {/* When user is logged in
      <div>
        <button>Name</button>
        <div className="dropdown">
          <ul>
            <li>Profile</li>
            <li>Logout</li>
          </ul>
        </div>
      </div> */}
    </nav>
  );
}
