type SelectProps = {
  genre?: string;
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void;
};

export function Select({ genre, onChange }: SelectProps) {
  return (
    <div>
      <select
        className="select input-bordered input-primary-focus w-full my-4"
        placeholder="Genre"
        id="genre"
        defaultValue={genre ? genre : "Genre"}
        onClick={onChange}
      >
        <option disabled>Genre</option>
        <option>Romance</option>
        <option>Drama</option>
        <option>Comedy</option>
        <option>Action</option>
        <option>Adventure</option>
        <option>Western</option>
        <option>Thriller</option>
        <option>Horror</option>
        <option>Fantasy</option>
        <option>Sci-fi</option>
        <option>Other</option>
      </select>
    </div>
  );
}
