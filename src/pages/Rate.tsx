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
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { RatedCard } from "../components/RatedCard";
import { Filter } from "../Assets/Filter";
import useLocalStorage from "../hooks/useLocalStorage";

interface rate {
  data: DocumentData;
  id: string;
}

export function Rate() {
  const [ratedMovie, setRatedMovie] = useState<rate[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useLocalStorage("sort", []);

  const pageSize = 4;

  useEffect(() => {
    const fetchMovies = async () => {
      const movieRef = collection(db, "ratedMovies");
      const q =
        sort === "DEFAULT"
          ? query(movieRef, orderBy("timestamp", "desc"), limit(pageSize))
          : sort === "ASC"
          ? query(movieRef, orderBy("movieName", "asc"), limit(pageSize))
          : sort === "DESC"
          ? query(movieRef, orderBy("movieName", "desc"), limit(pageSize))
          : sort === "GENRE"
          ? query(movieRef, orderBy("genre", "asc"), limit(pageSize))
          : query(movieRef, orderBy("timestamp", "desc"), limit(pageSize));

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
    console.log(currentPage);
  }, [sort]);

  //Show Previous Movies in Pagination
  const previousMovies = async ({ item }: DocumentData) => {
    if (currentPage !== 1) {
      try {
        const movieRef = collection(db, "ratedMovies");
        const previous =
          sort === "DEFAULT"
            ? query(
                movieRef,
                orderBy("timestamp", "desc"),
                endBefore(item.data.timestamp),
                limitToLast(pageSize + 1)
              )
            : sort === "ASC"
            ? query(
                movieRef,
                orderBy("movieName", "asc"),
                endBefore(item.data.movieName),
                limitToLast(pageSize + 1)
              )
            : sort === "DESC"
            ? query(
                movieRef,
                orderBy("movieName", "desc"),
                endBefore(item.data.movieName),
                limitToLast(pageSize + 1)
              )
            : sort === "GENRE"
            ? query(
                movieRef,
                orderBy("genre", "asc"),
                endBefore(item.data.genre),
                limitToLast(pageSize + 1)
              )
            : query(
                movieRef,
                orderBy("timestamp", "desc"),
                limitToLast(pageSize + 1)
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
                orderBy("timestamp", "desc"),
                startAfter(item.data.timestamp),
                limit(pageSize)
              )
            : sort === "ASC"
            ? query(
                movieRef,
                orderBy("movieName", "asc"),
                startAfter(item.data.movieName),
                limit(pageSize)
              )
            : sort === "DESC"
            ? query(
                movieRef,
                orderBy("movieName", "desc"),
                startAfter(item.data.movieName),
                limit(pageSize)
              )
            : sort === "GENRE"
            ? query(
                movieRef,
                orderBy("genre", "asc"),
                startAfter(item.data.genre),
                limit(pageSize)
              )
            : query(
                movieRef,
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

  const onFilterChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSort(e.currentTarget.value);
  };

  return (
    <div>
      <Tabs />
      <Filter sort={sort} onChange={onFilterChange} />

      <div className="mt-6">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Movie</th>
              <th>Watched On</th>
              <th>Rated</th>
              <th></th>
            </tr>
          </thead>

          {/* Display movies in array */}
          <tbody>
            {ratedMovie.map((movie) => (
              <RatedCard key={movie.id} onDelete={onDelete} movie={movie} />
            ))}
          </tbody>
        </table>
        <div className="flex w-full justify-center items-center gap-2 mt-2">
          <button onClick={() => previousMovies({ item: ratedMovie[0] })}>
            Back
          </button>
          <div className="divider h-10">
            <i className="fa-solid fa-ghost" />
          </div>
          <button
            onClick={() =>
              fetchNextMovies({ item: ratedMovie[ratedMovie.length - 1] })
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
