import { Link } from "react-router-dom";

export function Tabs() {
  return (
    <ul className="flex justify-evenly mt-[4rem] text-indigo-300 font-bold tabs text-[18px]">
      <Link
        className={"hover animate__animated animate__fadeInDown tabAnimate one"}
        to="/"
      >
        Want To Watch
      </Link>
      <Link
        className={"hover animate__animated animate__fadeInDown tabAnimate two"}
        to="/rate"
      >
        Rated Movies
      </Link>
      <Link
        className={
          "hover animate__animated animate__fadeInDown tabAnimate three"
        }
        to="/spin"
      >
        Spin
      </Link>
    </ul>
  );
}
