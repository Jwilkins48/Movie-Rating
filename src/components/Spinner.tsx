import WheelComponent from "react-wheel-of-prizes";
import { useState } from "react";

interface w {
  watch: any[];
}
function Spinner({ watch }: w) {
  const movieNames = watch?.map((movie) => movie.data.movieName);
  const segColors = [
    "#58c7f3",
    "#3abc6a",
    "#58c7f3",
    "#3abc6a",
    "#58c7f3",
    "#3abc6a",
    "#58c7f3",
    "#3abc6a",
  ];

  const [winner, setWinner] = useState("");
  const onFinished = (winner: string) => {
    console.log(winner);
    setWinner(winner);
  };

  return (
    <div className="wheel-wrapper mt-20 lg:mt-20 sm:ml-[12%] lg:ml-[37%] overflow-hidden">
      <div className="wheel-container mb-20">
        <WheelComponent
          segments={movieNames}
          segColors={segColors}
          onFinished={(winner: string) => onFinished(winner)}
          primaryColor="#3abc6a"
          contrastColor="#2d1b69"
          buttonText="Spin"
          isOnlyOnce={false}
          size={295}
          upDuration={100}
          downDuration={1000}
          fontFamily="Quicksand"
        />
      </div>
    </div>
  );
}

export default Spinner;
