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

interface rate {
  data: DocumentData;
  id: string;
}

export function Rate() {
  const [ratedMovie, setRatedMovie] = useState<rate[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieRef = collection(db, "ratedMovies");
        const q = query(movieRef, orderBy("timestamp", "desc"), limit(4));

        const querySnap = await getDocs(q);
        const moviesArray: rate[] = [];

        querySnap.forEach((doc) => {
          return moviesArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRatedMovie(moviesArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(4);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = ratedMovie.slice(firstPostIndex, lastPostIndex);
  const totalPosts = ratedMovie.length;

  const m = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    m.push(i);
  }

  const previous = async () => {
    const first = query(
      collection(db, "ratedMovies"),
      orderBy("timestamp", "desc"),
      limit(5)
    );
    const shots = await getDocs(first);
    const lastVisible = shots.docs[shots.docs.length - 1];

    const fetchPreviousPage = async () => {
      const movieRef = collection(db, "ratedMovies");
      const q = query(
        movieRef,
        orderBy("timestamp", "desc"),
        endBefore(lastVisible),
        limitToLast(5)
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
    fetchPreviousPage();
  };

  //Next in Pagination
  const next = async () => {
    const first = query(
      collection(db, "ratedMovies"),
      orderBy("timestamp", "desc"),
      limit(4)
    );
    const shots = await getDocs(first);
    const lastVisible = shots.docs[shots.docs.length - 1];

    if (ratedMovie.length === 0) {
      alert("Thats All!");
    } else {
      const fetchNextPage = async () => {
        const movieRef = collection(db, "ratedMovies");
        const q = query(
          movieRef,
          orderBy("timestamp", "desc"),
          startAfter(lastVisible),
          limit(4)
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
        setPage(page + 1);
      };
      fetchNextPage();
    }
  };

  //Delete From Want to Watch
  const onDelete = async (id: string) => {
    await deleteDoc(doc(db, "ratedMovies", id));
    const updatedList = ratedMovie.filter((item) => item.id !== id);
    setRatedMovie(updatedList);
    console.log("Movie Deleted");
  };

  return (
    <div>
      <Tabs />

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
        <button onClick={previous}>Previous</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}
