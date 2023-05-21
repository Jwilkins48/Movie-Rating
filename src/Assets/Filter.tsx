type FilterProps = {
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void;
};

export function Filter({ onChange }: FilterProps) {
  return (
    <select
      className="select input-bordered input-primary-focus w-full my-4"
      placeholder="Filter"
      onClick={onChange}
    >
      <option disabled>Filter</option>
      <option>DEFAULT</option>
      <option>ASC</option>
      <option>DESC</option>
      <option>GENRE</option>
    </select>
  );
}
