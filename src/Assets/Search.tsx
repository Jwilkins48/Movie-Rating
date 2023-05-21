import { useState } from "react";

export function Search() {
  const [state, setState] = useState({ query: "", list: [] });
  //   const [query, setQuery] = useState("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const results = 
  };
  return (
    <>
      <form>
        <input type="search" value={query} onChange={onChange} />
      </form>
    </>
  );
}
