import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

type TypeProps = {
  active: number;
  setActive: (active: number) => void;
};

export function Tabs({ active, setActive }: TypeProps) {
  const links = [
    { id: 0, title: "Want To Watch", path: "/" },
    { id: 1, title: "Rated Movies", path: "/rate" },
    { id: 2, title: "Spin", path: "/spin" },
  ];

  // const [active, setActive] = useLocalStorage("active", []);

  return (
    <ul className="flex justify-evenly mt-[4rem] text-indigo-300 font-bold tabs text-[18px]">
      {links.map((tab) => (
        <div key={tab.id} id={tab.id.toString()}>
          <Link className="link" to={tab.path}>
            <li
              className={tab.id === active ? "underline hover" : " hover"}
              onClick={() => setActive(tab.id)}
            >
              {tab.title}
            </li>
          </Link>
        </div>
      ))}
    </ul>
  );
}
