import WheelComponent from "react-wheel-of-prizes";

interface w {
  watch: any[];
}

function Spinner({ watch }: w) {
  const movieNames = watch?.map((movie) => movie.data.movieName);
  const segments = movieNames;
  //   const segColors = [
  //     "#58c7f3",
  //     "#e779c1",
  //     "#58c7f3",
  //     "#e779c1",
  //     "#58c7f3",
  //     "#e779c1",
  //     "#58c7f3",
  //     "#e779c1",
  //   ];
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

  const onFinished = (winner: string) => {
    console.log(winner);
  };

  return (
    <div className="wheel-wrapper mt-20 lg:mt-10 sm:ml-[12%] lg:ml-[36.5%] overflow-hidden">
      <div className="wheel-container">
        <WheelComponent
          segments={segments}
          segColors={segColors}
          onFinished={(winner: string) => onFinished(winner)}
          primaryColor="#20134e"
          contrastColor="#2d1b69"
          buttonText="Spin"
          isOnlyOnce={false}
          size={290}
          upDuration={100}
          downDuration={1000}
          fontFamily="Quicksand"
        />
      </div>
    </div>
  );
}

export default Spinner;
