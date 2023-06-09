import { DocumentData, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase.config";
import { Select } from "../Assets/Select";
import {
  FiveStar,
  FourHalfStar,
  FourStar,
  HalfStar,
  OneHalfStar,
  OneStar,
  ThreeHalfStar,
  ThreeStar,
  TwoHalfStar,
  TwoStar,
} from "../Assets/Stars";

type RatedCardProps = {
  movie: DocumentData;
  onDelete: (id: string) => void;
};

export function RatedCard({ movie, onDelete }: RatedCardProps) {
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    rating: "",
    date: "",
  });
  const [activeMenu, setActiveMenu] = useState("");
  const [editModal, setEditModal] = useState(false);

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [rate, setRate] = useState("");
  const [watched, setWatched] = useState("");

  //Default form info
  useEffect(() => {
    const fetchPost = async () => {
      //fetching post with id matching movie id
      const docRef = doc(db, "ratedMovies", movie.id);
      const docSnap = await getDoc(docRef);
      // Set formData if rate exists
      if (docSnap.exists()) {
        const data = docSnap.data();
        const r = data.rating;
        const g = data.genre;
        const d = data.date;

        setFormData((prevState) => ({
          ...prevState,
          rating: r,
          date: d,
          genre: g,
        }));
      } else {
        console.log("No rated movies");
      }
    };
    fetchPost();
  }, []);

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

  //Edit Name
  const onNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    setName(name);
    setFormData((prevState) => ({
      ...prevState,
      movieName: name,
    }));
  };

  //Edit genre
  const onGenreChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    setGenre(value);
    setFormData((prevState) => ({
      ...prevState,
      genre: value,
    }));
  };

  //Edit Rate
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
  const rating = movie.data.rating;

  return (
    <>
      <tr className="" key={movie.id}>
        <th className="flex flex-col">
          {/* Movie Name */}
          {editModal ? (
            <input
              onChange={onNameChange}
              defaultValue={movie.data.movieName}
              className="w-28 lg:w-80 text-[13px] rounded p-2 bg-secondary text-neutral"
              type="text"
              id="name"
            />
          ) : (
            <div className="truncate w-24 text-sm lg:overflow-visible lg:text-lg">
              {name ? name : movie.data.movieName}
            </div>
          )}

          {/* Movie Genre */}
          <span>
            {editModal ? (
              <Select
                genre={genre ? genre : movie.data.genre}
                onChange={onGenreChange}
              />
            ) : (
              <span className="text-xs text-gray-400">
                {genre ? genre : movie.data.genre}
              </span>
            )}
          </span>
        </th>
        <td className={editModal ? "p-0" : ""}>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">
                {/* Movie Date */}
                {editModal ? (
                  <input
                    onChange={onDateChange}
                    className="input input-bordered input-primary-focus w-28 text-[13px] p-1 mt-9"
                    type="date"
                    id="date"
                  />
                ) : (
                  <div className="text-sm">
                    {watched ? watched : movie.data.date}
                  </div>
                )}
              </div>
            </div>
          </div>
        </td>
        <td>
          {/* Movie Rate */}
          {editModal ? (
            <select
              className="p-0 mt-4 lg:mt-10 rounded bg-primary text-neutral"
              onClick={onSelectChange}
            >
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
                <div className="hidden sm:block">
                  {rate ? (
                    rate === ".5" ? (
                      <HalfStar />
                    ) : rate === "1" ? (
                      <OneStar />
                    ) : rate === "1.5" ? (
                      <OneHalfStar />
                    ) : rate === "2" ? (
                      <TwoStar />
                    ) : rate === "2.5" ? (
                      <TwoHalfStar />
                    ) : rate === "3" ? (
                      <ThreeStar />
                    ) : rate === "3.5" ? (
                      <ThreeHalfStar />
                    ) : rate === "4" ? (
                      <FourStar />
                    ) : rate === "4.5" ? (
                      <FourHalfStar />
                    ) : rate === "5" ? (
                      <FiveStar />
                    ) : (
                      ""
                    )
                  ) : rating === ".5" ? (
                    <HalfStar />
                  ) : rating === "1" ? (
                    <OneStar />
                  ) : rating === "1.5" ? (
                    <OneHalfStar />
                  ) : rating === "2" ? (
                    <TwoStar />
                  ) : rating === "2.5" ? (
                    <TwoHalfStar />
                  ) : rating === "3" ? (
                    <ThreeStar />
                  ) : rating === "3.5" ? (
                    <ThreeHalfStar />
                  ) : rating === "4" ? (
                    <FourStar />
                  ) : rating === "4.5" ? (
                    <FourHalfStar />
                  ) : rating === "5" ? (
                    <FiveStar />
                  ) : (
                    ""
                  )}
                </div>
                <div className="block sm:hidden">
                  {rate ? rate : movie.data.rating}/5
                </div>
              </div>
            </label>
          )}
        </td>

        <td className="relative">
          <button onClick={toggleActive}>
            <i className="fa-solid fa-angle-down" />
          </button>
          <div
            className={
              activeMenu === movie.id && editModal
                ? "reveal bg-secondary text-neutral top-[98px] lg:mr-[80px] lg:top-[85px] z-10"
                : activeMenu === movie.id
                ? "reveal bg-secondary text-neutral z-10 lg:mr-[90px]"
                : "hide"
            }
          >
            <ul>
              <li>
                {/* Toggle Edit */}
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
