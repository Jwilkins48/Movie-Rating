import { Link } from "react-router-dom";

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

  return (
    <ul className="flex justify-center gap-6 sm:gap-10 md:gap-48 sm:mb-14 mt-[4rem] text-indigo-300 font-bold tabs text-[19px]">
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
