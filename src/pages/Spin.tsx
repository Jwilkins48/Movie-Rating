import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import WheelComponent from "react-wheel-of-prizes";

import { db } from "../../firebase.config";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

interface watching {
  data: DocumentData;
  id: string;
}

export function Spin() {
  const [watch, setWatch] = useState<watching[]>([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      const movieRef = collection(db, "wantToWatch");
      const q = query(
        movieRef,
        where("userRef", "==", auth.currentUser?.uid),
        orderBy("timestamp", "desc")
      );

      const querySnap = await getDocs(q);
      const moviesArray: watching[] = [];
      querySnap.forEach((doc) => {
        return moviesArray.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setWatch(moviesArray);
      setLoading(false);
    };
    fetchMovies();
    console.log(movieNames);
  }, []);

  const movieNames = watch?.map((movie) => movie.data.movieName);
  const segColors = [
    "#20134e",
    // "#2d1b69",
    // "#22c55e",
    // "#2d1b69",
    // "#22c55e",
    // "#2d1b69",
    // "#22c55e",
  ];

  const onFinished = (winner: string) => {
    console.log(winner);
  };

  return (
    <div className="overflow-hidden">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex w-full justify-center align-center ml-48">
          <WheelComponent
            segments={movieNames}
            segColors={segColors}
            winningSegment="MM"
            onFinished={(winner: string) => onFinished(winner)}
            primaryColor="#e679c1"
            contrastColor="#58c7f3"
            buttonText="Spin"
            isOnlyOnce={false}
            size={190}
            upDuration={500}
            downDuration={600}
            fontFamily="Helvetica"
          />
        </div>
      )}
    </div>
  );
}
