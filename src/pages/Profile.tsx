import {
  DocumentData,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { getAuth } from "firebase/auth";
import { TopRated } from "../components/TopRated";
// import { OneStar } from "../Assets/Stars";

interface ratedList {
  data: DocumentData;
  id: string;
}

export function Profile() {
  const [movies, setMovies] = useState<ratedList[]>([]);
  const auth = getAuth();

  useEffect(() => {
    const auth = getAuth();
    const fetchFavorites = async () => {
      const movieRef = collection(db, "ratedMovies");
      const q = query(
        movieRef,
        orderBy("rating", "desc"),
        where("userRef", "==", auth.currentUser?.uid),
        limit(10)
      );

      const querySnap = await getDocs(q);
      const moviesArray: ratedList[] = [];

      querySnap.forEach((doc) => {
        return moviesArray.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setMovies(moviesArray);
    };

    fetchFavorites();
  }, []);
  return (
    <div className="flex flex-col overflow-x-hidden mx-2 lg:mx-[20rem]">
      <h1 className="text-3xl text-accent font-bold flex items-center justify-center mt-16 mb-10 title">
        {auth.currentUser?.displayName}'s Top 10
      </h1>
      <table className="table table-zebra lg:border-2 shadow-xl border-neutral">
        <thead>
          <tr>
            <th>Movie Name</th>
            <th>Rating</th>
          </tr>
        </thead>
        {/* Display movies in array */}
        <tbody>
          {movies.map((movie: DocumentData) => (
            <TopRated key={movie.id} movie={movie} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
