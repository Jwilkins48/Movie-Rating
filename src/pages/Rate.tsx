import { useEffect, useState } from "react";
import { Tabs } from "../components/Tabs";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { RatedCard } from "../components/RatedCard";
import { Filter } from "../Assets/Filter";
import useLocalStorage from "../hooks/useLocalStorage";
import { getAuth } from "firebase/auth";

interface rate {
  data: DocumentData;
  id: string;
}

export function Rate() {
  const [ratedMovie, setRatedMovie] = useState<rate[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useLocalStorage("sort", []);
  const pageSize = 5;

  const auth = getAuth();
  useEffect(() => {
    const fetchMovies = async () => {
      const auth = getAuth();
      const movieRef = collection(db, "ratedMovies");
      const q =
        sort === "DEFAULT"
          ? query(
              movieRef,
              where("userRef", "==", auth.currentUser?.uid),
              orderBy("timestamp", "desc"),
              limit(pageSize)
            )
          : sort === "ASC"
          ? query(
              movieRef,
              where("userRef", "==", auth.currentUser?.uid),
              orderBy("movieName", "asc"),
              limit(pageSize)
            )
          : sort === "DESC"
          ? query(
              movieRef,
              where("userRef", "==", auth.currentUser?.uid),
              orderBy("movieName", "desc"),
              limit(pageSize)
            )
          : sort === "GENRE"
          ? query(
              movieRef,
              where("userRef", "==", auth.currentUser?.uid),
              orderBy("genre", "asc"),
              limit(pageSize)
            )
          : query(
              movieRef,
              where("userRef", "==", auth.currentUser?.uid),
              orderBy("timestamp", "desc"),
              limit(pageSize)
            );

      const querySnap = await getDocs(q);
      const moviesArray: rate[] = [];
      querySnap.forEach((doc) => {
        return moviesArray.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setRatedMovie(moviesArray);
    };
    fetchMovies();
  }, [sort]);

  //Show Previous Movies in Pagination
  const previousMovies = async ({ item }: DocumentData) => {
    if (currentPage !== 1) {
      try {
        const auth = getAuth();
        const movieRef = collection(db, "ratedMovies");
        const previous =
          sort === "DEFAULT"
            ? query(
                movieRef,
                where("userRef", "==", auth.currentUser?.uid),
                orderBy("timestamp", "desc"),
                endBefore(item.data.timestamp),
                limitToLast(pageSize)
              )
            : sort === "ASC"
            ? query(
                movieRef,
                where("userRef", "==", auth.currentUser?.uid),
                orderBy("movieName", "asc"),
                endBefore(item.data.movieName),
                limitToLast(pageSize)
              )
            : sort === "DESC"
            ? query(
                movieRef,
                where("userRef", "==", auth.currentUser?.uid),
                orderBy("movieName", "desc"),
                endBefore(item.data.movieName),
                limitToLast(pageSize)
              )
            : sort === "GENRE"
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
        const moviesArray: rate[] = [];

        previousSnap.docs.map((doc) => {
          return moviesArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setCurrentPage(currentPage - 1);
        setRatedMovie(moviesArray);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("First Page");
    }
  };

  //Show Next Movies in Pagination
  const fetchNextMovies = async ({ item }: DocumentData) => {
    if (ratedMovie.length < pageSize) {
      alert("Thats all for now!");
    } else {
      try {
        const movieRef = collection(db, "ratedMovies");
        const next =
          sort === "DEFAULT"
            ? query(
                movieRef,
                where("userRef", "==", auth.currentUser?.uid),
                orderBy("timestamp", "desc"),
                startAfter(item.data.timestamp),
                limit(pageSize)
              )
            : sort === "ASC"
            ? query(
                movieRef,
                where("userRef", "==", auth.currentUser?.uid),
                orderBy("movieName", "asc"),
                startAfter(item.data.movieName),
                limit(pageSize)
              )
            : sort === "DESC"
            ? query(
                movieRef,
                where("userRef", "==", auth.currentUser?.uid),
                orderBy("movieName", "desc"),
                startAfter(item.data.movieName),
                limit(pageSize)
              )
            : sort === "GENRE"
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
        const moviesArray: rate[] = [];
        nextSnap.docs.map((doc) => {
          return moviesArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setRatedMovie(moviesArray);
        setCurrentPage(currentPage + 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Delete From Want to Watch
  const onDelete = async (id: string) => {
    await deleteDoc(doc(db, "ratedMovies", id));
    const updatedList = ratedMovie.filter((item) => item.id !== id);
    setRatedMovie(updatedList);
    console.log("Movie Deleted");
  };

  //Filter
  const onFilterChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSort(e.currentTarget.value);
  };

  //Search
  const [state, setState] = useState<DocumentData>({
    search: "",
    list: [],
  });
  const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const results = ratedMovie.filter((movie) => {
      if (e.currentTarget.value === "") {
        return ratedMovie;
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

  return (
    <div>
      <Tabs />
      <div className="overflow-x-hidden mx-1 mt-6 lg:mx-[13rem] lg:mt-10 lg:m-auto">
        <div className="w-full flex justify-between items-center">
          <div>
            <form className="relative">
              <button>
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
          <Filter sort={sort} onChange={onFilterChange} />
        </div>

        <div>
          <table className="table table-zebra w-full lg:border-2 shadow-lg border-neutral">
            <thead>
              <tr>
                <th>Movie</th>
                <th>Watched On</th>
                <th>Rated</th>
                <th></th>
              </tr>
            </thead>

            {/* Display movies in array */}
            {state.search === "" ? (
              <tbody>
                {ratedMovie.map((movie) => (
                  <RatedCard key={movie.id} onDelete={onDelete} movie={movie} />
                ))}
              </tbody>
            ) : (
              <tbody>
                {state.list.map((movie: DocumentData) => (
                  <RatedCard key={movie.id} onDelete={onDelete} movie={movie} />
                ))}
              </tbody>
            )}
          </table>
          <div className="flex w-full justify-center items-center gap-2 mt-2">
            <button
              disabled={currentPage == 1 ? true : false}
              className={currentPage == 1 ? "text-gray-500" : ""}
              onClick={() => previousMovies({ item: ratedMovie[0] })}
            >
              Back
            </button>
            <div className="divider h-10">
              <i className="fa-solid fa-ghost" />
            </div>
            <button
              disabled={ratedMovie.length < pageSize ? true : false}
              className={ratedMovie.length < pageSize ? "text-gray-500" : ""}
              onClick={() =>
                fetchNextMovies({ item: ratedMovie[ratedMovie.length - 1] })
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
