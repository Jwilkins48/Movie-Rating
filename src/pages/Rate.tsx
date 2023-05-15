import { useEffect, useState } from "react";
import { Tabs } from "../components/Tabs";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { RatedCard } from "../components/RatedCard";

interface rate {
  data: DocumentData;
  id: string;
}

export function Rate() {
  const [ratedMovie, setRatedMovie] = useState<rate[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieRef = collection(db, "ratedMovies");
        const q = query(movieRef, orderBy("timestamp", "desc"));

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
  }, [ratedMovie.length]);

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
      </div>
    </div>
  );
}
