import { RateModal } from "../components/RateModal";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";
import { Tabs } from "../components/Tabs";
import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

interface movie {
  data: DocumentData;
  id: string;
}

export function Home() {
  const [formData, setFormData] = useState({ movieName: "", genre: "" });
  const [movies, setMovies] = useState<movie[]>([]);
  const [rateModal, setRateModal] = useState(false);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieRef = collection(db, "wantToWatch");
        const q = query(movieRef, orderBy("timestamp", "desc"));

        const querySnap = await getDocs(q);
        const moviesArray: movie[] = [];

        querySnap.forEach((doc) => {
          return moviesArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setMovies(moviesArray);
        console.log(movies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [modal]);

  //Submit Modal
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    if (formData.movieName !== "") {
      //Add timestamp
      const formDataCopy = {
        ...formData,
        timestamp: serverTimestamp(),
      };

      // Add form data to collection
      await addDoc(collection(db, "wantToWatch"), formDataCopy);
      console.log("Saved!");
      setModal(false);

      //Reset Form
      const resetForm = e.target as HTMLFormElement;
      resetForm.reset();
      navigate("/");
    } else {
      alert("Enter movie name");
    }
  };

  //Modal Selected Movie Genre
  const onSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    setFormData((prevState) => ({
      ...prevState,
      genre: value,
    }));
  };

  //Modal Movie Name Input
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setFormData((prevState) => ({
      ...prevState,
      movieName: value,
    }));
  };

  //Delete From Want to Watch
  const onDelete = async (id: string) => {
    await deleteDoc(doc(db, "wantToWatch", id));
    const updatedList = movies.filter((item) => item.id !== id);
    setMovies(updatedList);
    console.log("Movie Deleted");
  };

  const onWatchedClick = (id: string) => {
    setRateModal(!rateModal);
    // onDelete(id);
  };

  return (
    <div>
      <Tabs />

      <div className="overflow-x-auto mx-2 my-6">
        <label
          onClick={() => setModal(true)}
          htmlFor="my-modal-3"
          className="btn mb-2"
        >
          + Add
        </label>

        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Movie Name</th>
              <th>Genre</th>
              <th>
                <label>Watched</label>
              </th>
              <th></th>
            </tr>
          </thead>
          {/* Display movies in array */}
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <th>{movie.data.movieName}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{movie.data.genre}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <label>
                    <input
                      onClick={() => onWatchedClick(movie.id)}
                      type="checkbox"
                      className="checkbox"
                    />
                  </label>
                </td>

                <td>
                  <button onClick={() => onDelete(movie.id)}>
                    <i className="fa-solid fa-xmark" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rateModal && (
        <RateModal rateModal={rateModal} setRateModal={setRateModal} />
      )}

      {/* ADD MOVIE MODAL */}
      <input
        readOnly
        type="checkbox"
        id="my-modal-3"
        checked={modal}
        className="modal-toggle"
      />
      <form onSubmit={onSubmit} className="modal" id="modal">
        <div className="modal-box relative">
          <label
            onClick={() => setModal(false)}
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl text-accent mt-2 font-bold ml-1 title">
            Want To Watch
          </h3>
          <div>
            <input
              onChange={onChange}
              placeholder="Movie Name"
              className="input input-bordered input-primary-focus w-full mt-4"
              type="text"
              id="movieName"
            />
          </div>
          <div>
            <select
              className="select input-bordered input-primary-focus w-full my-4"
              placeholder="Genre"
              id="genre"
              defaultValue="Genre"
              onClick={onSelectChange}
            >
              <option disabled>Genre</option>
              <option>Romance</option>
              <option>Drama</option>
              <option>Comedy</option>
              <option>Action</option>
              <option>Adventure</option>
              <option>Western</option>
              <option>Thriller</option>
              <option>Horror</option>
              <option>Fantasy</option>
              <option>Sci-fi</option>
              <option>Other</option>
            </select>
          </div>

          <button type="submit" className="btn ">
            <i className="mr-2 fa-solid fa-plus"></i> Add Movie
          </button>
        </div>
      </form>
    </div>
  );
}
