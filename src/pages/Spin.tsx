import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { Tabs } from "../components/Tabs";
// import WheelComponent from "react-wheel-of-prizes";
// import "react-wheel-of-prizes/dist/index.css";
import { db } from "../../firebase.config";
import { useEffect, useState } from "react";

interface rate {
  data: DocumentData;
  id: string;
}

export function Spin() {
  const [ratedMovie, setRatedMovie] = useState<rate[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
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
    };

    fetchMovies();
  }, []);

  const segColors = [
    "black",
    "#60BA97",
    "black",
    "#60BA97",
    "black",
    "#60BA97",
  ];

  const movies = ratedMovie.map((item) => item.data.movieName);
  const segments = movies;

  return (
    <div>
      <Tabs />
      {/* <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment="MM"
        onFinished={(winner) => onFinished(winner)}
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
