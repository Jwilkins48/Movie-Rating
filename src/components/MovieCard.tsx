import { DocumentData } from "firebase/firestore";

type RatedCardProps = {
  movie: DocumentData;
  onClick: (id: string, name: string, genre: string) => void;
  onDelete: (id: string) => void;
};

export function MovieCard({ movie, onClick, onDelete }: RatedCardProps) {
  return (
    <tr key={movie.id}>
      <th>{movie.data.movieName}</th>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{movie.data.genre}</div>
          </div>
        </div>
      </td>
      <td>
        <label>
          <input
            onClick={() =>
              onClick(movie.id, movie.data.movieName, movie.data.genre)
            }
            type="checkbox"
            className="checkbox"
          />
        </label>
      </td>

      <td>
        <button onClick={() => onDelete(movie.id)}>
          <i className="fa-solid fa-xmark" />
        </button>
      </td>
    </tr>
  );
}
