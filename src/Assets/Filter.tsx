type FilterProps = {
  sort: string;
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void;
};

export function Filter({ sort, onChange }: FilterProps) {
  return (
    <select
      className="select input-bordered input-primary-focus my-3"
      placeholder="Filter"
      onClick={onChange}
    >
      <option disabled>Filter</option>
      <option selected={sort == "DEFAULT" ? true : false}>DEFAULT</option>
      <option selected={sort == "ASC" ? true : false}>ASC</option>
      <option selected={sort == "DESC" ? true : false}>DESC</option>
      <option selected={sort == "GENRE" ? true : false}>GENRE</option>
    </select>
  );
}
