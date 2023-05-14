import { DocumentData } from "firebase/firestore";
import { useState } from "react";

type RatedCardProps = {
  movie: DocumentData;
  dropDown: boolean;
  id: string;
  setDropDown: (dropDown: boolean) => void;
};

export function RatedCard({
  movie,
  dropDown,
  setDropDown,
  id,
}: RatedCardProps) {
  const [activeMenu, setActiveMenu] = useState();
  return (
    <>
      <tr key={movie.id}>
        <th>{movie.movieName}</th>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{movie.genre}</div>
            </div>
          </div>
        </td>
        <td>
          <label>
            <div className="font-bold">{movie.rating}/5</div>
          </label>
        </td>

        <td>
          <button>
            <i className="fa-solid fa-angle-down" />
          </button>
          <div className={dropDown ? "" : "hidden"}>
            <ul>
              <li>Edit</li>
              <li>Delete</li>
            </ul>
          </div>
        </td>
      </tr>
    </>
  );
}
