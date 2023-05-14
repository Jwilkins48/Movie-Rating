import { useEffect, useState } from "react";
import { Tabs } from "../components/Tabs";
import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { RatedCard } from "../components/RatedCard";

interface rated {
  data: DocumentData;
  id: string;
}

export function Rate() {
  const [ratedMovie, setRatedMovie] = useState<rated[]>([]);
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieRef = collection(db, "ratedMovies");
        const q = query(movieRef, orderBy("timestamp", "desc"));

        const querySnap = await getDocs(q);
        const moviesArray: rated[] = [];

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

  return (
    <div>
      <Tabs />

      <div>
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Movie</th>
              <th>Genre</th>
              <th>
                <label>Rated</label>
              </th>
              <th></th>
            </tr>
          </thead>
          {/* Display movies in array */}
          <tbody>
            {ratedMovie.map((movie) => (
              <RatedCard
                key={movie.id}
                id={movie.id}
                movie={movie.data}
                setDropDown={setDropDown}
                dropDown={dropDown}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
