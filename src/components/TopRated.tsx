import { DocumentData } from "firebase/firestore";
import {
  FiveStar,
  FourHalfStar,
  FourStar,
  HalfStar,
  OneHalfStar,
  OneStar,
  ThreeHalfStar,
  ThreeStar,
  TwoHalfStar,
  TwoStar,
} from "../Assets/Stars";

type RatedCardProps = {
  movie: DocumentData;
};

export function TopRated({ movie }: RatedCardProps) {
  const rating = movie.data.rating;
  return (
    <>
      <tr key={movie.id}>
        <th>
          <p>{movie.data.movieName}</p>
          <span className="text-xs text-gray-400">{movie.data.genre}</span>
        </th>

        <td>
          <div>
            {rating === ".5" ? (
              <HalfStar />
            ) : rating === "1" ? (
              <OneStar />
            ) : rating === "1.5" ? (
              <OneHalfStar />
            ) : rating === "2" ? (
              <TwoStar />
            ) : rating === "2.5" ? (
              <TwoHalfStar />
            ) : rating === "3" ? (
              <ThreeStar />
            ) : rating === "3.5" ? (
              <ThreeHalfStar />
            ) : rating === "4" ? (
              <FourStar />
            ) : rating === "4.5" ? (
              <FourHalfStar />
            ) : rating === "5" ? (
              <FiveStar />
            ) : (
              ""
            )}
          </div>
        </td>
      </tr>
    </>
  );
}
