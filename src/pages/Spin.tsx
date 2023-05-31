import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
// import WheelComponent from "react-wheel-of-prizes";

import { db } from "../../firebase.config";
import { useEffect, useState } from "react";

interface watching {
  data: DocumentData;
  id: string;
}

export function Spin() {
  const [watch, setWatch] = useState<watching[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movieRef = collection(db, "wantToWatch");
      const q = query(movieRef, orderBy("timestamp", "desc"));

      const querySnap = await getDocs(q);
      const moviesArray: watching[] = [];
      querySnap.forEach((doc) => {
        return moviesArray.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setWatch(moviesArray);
    };
    fetchMovies();
  }, []);

  const movieNames = watch?.map((movie) => movie.data.movieName);
  const segments = movieNames;
  const segColors = [
    "black",
    "#60BA97",
    "black",
    "#60BA97",
    "black",
    "#60BA97",
  ];

  const onFinished = (winner: string) => {
    console.log(winner);
  };

  return (
    <div>
      spin
      {/* <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment="MM"
        onFinished={(winner: string) => onFinished(winner)}
        primaryColor="black"
        contrastColor="white"
        buttonText="Start"
        isOnlyOnce={false}
        size={190}
        upDuration={500}
        downDuration={600}
        fontFamily="Helvetica"
      /> */}
    </div>
  );
}
