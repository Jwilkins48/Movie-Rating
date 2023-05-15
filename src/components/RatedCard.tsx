import { DocumentData, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase.config";

type RatedCardProps = {
  movie: DocumentData;
  onDelete: (id: string) => void;
};

export function RatedCard({ movie, onDelete }: RatedCardProps) {
  const [formData, setFormData] = useState({ rating: "", date: "" });
  const [activeMenu, setActiveMenu] = useState("");
  const [editModal, setEditModal] = useState(false);

  const [rate, setRate] = useState("");
  const [watched, setWatched] = useState("");

  //Open dropdown
  const toggleActive = () => {
    if (activeMenu == "") {
      setActiveMenu(movie.id);
    } else {
      setActiveMenu("");
    }
  };

  //Toggle edit option
  const toggleEdit = () => {
    setEditModal(!editModal);
  };

  //Edit Rating
  const onSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    setRate(value);
    setFormData((prevState) => ({
      ...prevState,
      rating: value,
    }));
  };

  //Edit Date
  const onDateChange = (e: React.FormEvent<HTMLInputElement>) => {
    const date = e.currentTarget.value;
    setWatched(date);
    setFormData((prevState) => ({
      ...prevState,
      date: date,
    }));
  };

  //Update Rating
  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleEdit();
    toggleActive();
    const docRef = doc(db, "ratedMovies", movie.id);
    await updateDoc(docRef, formData);
    console.log("Updated");
  };

  return (
    <>
      <tr key={movie.id}>
        <th className="flex flex-col">
          {movie.data.movieName}{" "}
          <span className="text-xs text-gray-400">{movie.data.genre}</span>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">
                {editModal ? (
                  <input
                    onChange={onDateChange}
                    className="input input-bordered input-primary-focus w-28 text-[13px] p-1"
                    type="date"
                    id="date"
                  />
                ) : (
                  <div>{watched ? watched : movie.data.date}</div>
                )}
              </div>
            </div>
          </div>
        </td>
        <td>
          {editModal ? (
            <select onClick={onSelectChange}>
              <option className="font-bold">.5</option>
              <option className="font-bold">1</option>
              <option className="font-bold">1.5</option>
              <option className="font-bold">2</option>
              <option className="font-bold">2.5</option>
              <option className="font-bold">3</option>
              <option className="font-bold">3.5</option>
              <option className="font-bold">4</option>
              <option className="font-bold">4.5</option>
              <option className="font-bold">5</option>
            </select>
          ) : (
            <label>
              <div className="font-bold">
                {rate ? rate : movie.data.rating}/5
              </div>
            </label>
          )}
        </td>

        <td>
          <button onClick={toggleActive}>
            <i className="fa-solid fa-angle-down" />
          </button>
          <div
            className={
              activeMenu === movie.id
                ? "reveal bg-secondary text-neutral"
                : "hide"
            }
          >
            <ul>
              <li>
                {/* open modal put in id */}
                {editModal ? (
                  <button onClick={onSubmit}>Update</button>
                ) : (
                  <button onClick={toggleEdit}>Edit</button>
                )}
              </li>

              <li>
                <button onClick={() => onDelete(movie.id)}>Delete</button>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </>
  );
}
