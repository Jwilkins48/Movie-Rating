import { DocumentData } from "firebase/firestore";

type RatedCardProps = {
  movie: DocumentData;
};

export function TopRated({ movie }: RatedCardProps) {
  return (
    <>
      <tr key={movie.id}>
        <th>
          <p>{movie.data.movieName}</p>
          <span className="text-xs text-gray-400">{movie.data.genre}</span>
        </th>

        <td>
          <div>{movie.data.rating} Stars</div>
        </td>
      </tr>
    </>
  );
}
