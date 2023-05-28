import { RateModal } from "../components/RateModal";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  where,
  limitToLast,
  endBefore,
  startAfter,
  limit,
} from "firebase/firestore";
import { Select } from "../Assets/Select";
import { getAuth } from "firebase/auth";
import useLocalStorage from "../hooks/useLocalStorage";
import { Filter } from "../Assets/Filter";
import { MovieCard } from "../components/MovieCard";

interface movie {
  data: DocumentData;
  id: string;
}

export function Home() {
  const [formData, setFormData] = useState({ movieName: "", genre: "" });
  const [sortWatch, setSortWatch] = useLocalStorage("sortWatch", []);
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState<movie[]>([]);
  const [rateModal, setRateModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [genre, setGenre] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();
  const pageSize = 5;

  useEffect(() => {
    const auth = getAuth();

    const fetchMovies = async () => {
      try {
        const movieRef = collection(db, "wantToWatch");

        const q =
          sortWatch === "DEFAULT"
            ? query(
                movieRef,
                orderBy("timestamp", "desc"),
                where("userRef", "==", auth.currentUser?.uid),
                limit(pageSize)
              )
            : sortWatch === "ASC"
            ? query(
                movieRef,
                orderBy("movieName", "asc"),
                where("userRef", "==", auth.currentUser?.uid),
                limit(pageSize)
              )
            : sortWatch === "DESC"
            ? query(
                movieRef,
                orderBy("movieName", "desc"),
                where("userRef", "==", auth.currentUser?.uid),
                limit(pageSize)
              )
            : sortWatch === "GENRE"
            ? query(
                movieRef,
                orderBy("genre", "desc"),
                where("userRef", "==", auth.currentUser?.uid),
                limit(pageSize)
              )
            : query(
                movieRef,
                orderBy("timestamp", "desc"),
                where("userRef", "==", auth.currentUser?.uid),
                limit(pageSize)
              );

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
  }, [modal, sortWatch]);

  //Submit Modal
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const auth = getAuth();
    if (formData.movieName !== "") {
      //Add timestamp
      const formDataCopy = {
        ...formData,
        userRef: auth.currentUser?.uid,
        timestamp: serverTimestamp(),
      };

      // Add form data to collection
      await addDoc(collection(db, "wantToWatch"), formDataCopy);
      console.log("Saved!");
      setModal(false);

      //Reset Form
      const resetForm = e.target as HTMLFormElement;
      resetForm.reset();

      setFormData((prevState) => ({
        ...prevState,
        genre: "",
      }));
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

  const onWatchedClick = (id: string, name: string, genre: string) => {
    setRateModal(!rateModal);
    setName(name);
    setGenre(genre);
    onDelete(id);
  };

  //Filter
  const onFilterChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSortWatch(e.currentTarget.value);
  };

  //Show Previous Movies in Pagination
  const previousMovies = async ({ item }: DocumentData) => {
    if (currentPage !== 1) {
      try {
        const auth = getAuth();
        const movieRef = collection(db, "wantToWatch");
        const previous =
          sortWatch === "DEFAULT"
            ? query(
                movieRef,
                where("userRef", "==", auth.currentUser?.uid),
                orderBy("timestamp", "desc"),
                endBefore(item.data.timestamp),
                limitToLast(pageSize)
              )
            : sortWatch === "ASC"
            ? query(
                movieRef,
                where("userRef", "==", auth.currentUser?.uid),
                orderBy("movieName", "asc"),
                endBefore(item.data.movieName),
                limitToLast(pageSize)
              )
            : sortWatch === "DESC"
            ? query(
                movieRef,
                where("userRef", "==", auth.currentUser?.uid),
                orderBy("movieName", "desc"),
                endBefore(item.data.movieName),
                limitToLast(pageSize)
              )
            : sortWatch === "GENRE"
            ? query(
                movieRef,
                where("userRef", "==", auth.currentUser?.uid),
                orderBy("genre", "asc"),
                endBefore(item.data.genre),
                limitToLast(pageSize)
              )
            : query(
                movieRef,
                where("userRef", "==", auth.currentUser?.uid),
                orderBy("timestamp", "desc"),
                limitToLast(pageSize)
              );

        const previousSnap = await getDocs(previous);
        const moviesArray: movie[] = [];

        previousSnap.docs.map((doc) => {
          return moviesArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setCurrentPage(currentPage - 1);
        setMovies(moviesArray);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("First Page");
    }
  };

  //Show Next Movies in Pagination
  const fetchNextMovies = async ({ item }: DocumentData) => {
    if (movies.length < pageSize) {
      alert("Thats all for now!");
    } else {
      try {
        const movieRef = collection(db, "wantToWatch");
        const next =
          sortWatch === "DEFAULT"
            ? query(
                movieRef,
                where("userRef", "==", auth.currentUser?.uid),
                orderBy("timestamp", "desc"),
                startAfter(item.data.timestamp),
                limit(pageSize)
              )
            : sortWatch === "ASC"
            ? query(
                movieRef,
                where("userRef", "==", auth.currentUser?.uid),
                orderBy("movieName", "asc"),
                startAfter(item.data.movieName),
                limit(pageSize)
              )
            : sortWatch === "DESC"
            ? query(
                movieRef,
                where("userRef", "==", auth.currentUser?.uid),
                orderBy("movieName", "desc"),
                startAfter(item.data.movieName),
                limit(pageSize)
              )
            : sortWatch === "GENRE"
            ? query(
                movieRef,
                where("userRef", "==", auth.currentUser?.uid),
                orderBy("genre", "asc"),
                startAfter(item.data.genre),
                limit(pageSize)
              )
            : query(
                movieRef,
                where("userRef", "==", auth.currentUser?.uid),
                orderBy("timestamp", "desc"),
                startAfter(item.data.timestamp),
                limit(pageSize)
              );

        const nextSnap = await getDocs(next);
        const moviesArray: movie[] = [];
        nextSnap.docs.map((doc) => {
          return moviesArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setMovies(moviesArray);
        setCurrentPage(currentPage + 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Search
  const [state, setState] = useState<DocumentData>({
    search: "",
    list: [],
  });
  const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const results = movies.filter((movie) => {
      if (e.currentTarget.value === "") {
        return movie;
      }
      return movie.data.movieName
        .toLowerCase()
        .includes(e.currentTarget.value.toLowerCase());
    });
    setState({
      search: e.currentTarget.value,
      list: results,
    });
  };

  const [searchOpen, setSearchOpen] = useState(false);
  const onSearchClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchOpen(!searchOpen);
  };

  return (
    <div className="">
      <Tabs />
      <div className="overflow-x-hidden mx-2 my-6 lg:mx-[13rem] lg:mt-10 lg:m-auto ">
        <div className="w-full flex justify-between items-center">
          <div>
            <form className="relative">
              <button onClick={onSearchClick}>
                <i className="fa-solid fa-magnifying-glass ml-3 absolute top-[10px] text-primary" />
              </button>
              <input
                className="input input-bordered input-secondary py-4 md:w-60 w-52 h-8 rounded text-indigo-300 font-bold ml-1 pl-7"
                type="search"
                value={state.search}
                onChange={handleChange}
              />
            </form>
          </div>
          <Filter sort={sortWatch} onChange={onFilterChange} />
        </div>
        <table className="table table-zebra w-full lg:border-2 shadow-lg border-neutral">
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
          {state.search === "" ? (
            <tbody>
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={onWatchedClick}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          ) : (
            <tbody>
              {state.list.map((movie: DocumentData) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={onWatchedClick}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          )}
        </table>

        <div className="lg:w-full lg:flex justify-end items-center">
          <label
            onClick={() => setModal(true)}
            htmlFor="my-modal-3"
            className="btn w-full lg:w-40 mt-2 lg:shadow-xl"
          >
            <i className=" fa-solid fa-plus mt-[.6px] mr-[.4rem]" /> Add
          </label>
        </div>

        <div className="flex justify-center items-center gap-2 mt-2 m-auto">
          <button
            className={currentPage == 1 ? "text-gray-500" : ""}
            disabled={currentPage == 1 ? true : false}
            onClick={() => previousMovies({ item: movies[0] })}
          >
            Back
          </button>
          <div className="divider h-10">
            <i className="fa-solid fa-ghost" />
          </div>
          <button
            className={movies.length < pageSize ? "text-gray-500" : ""}
            disabled={movies.length < pageSize ? true : false}
            onClick={() => fetchNextMovies({ item: movies[movies.length - 1] })}
          >
            Next
          </button>
        </div>
      </div>

      {rateModal && (
        <RateModal
          name={name}
          genre={genre}
          rateModal={rateModal}
          setRateModal={setRateModal}
        />
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

          <Select onChange={onSelectChange} />
          <button type="submit" className="btn ">
            <i className="mr-2 fa-solid fa-plus"></i> Add Movie
          </button>
        </div>
      </form>
    </div>
  );
}
