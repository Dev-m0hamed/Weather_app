import { Fragment } from "react";
import type { Results } from "../../hooks/debounce";

interface SuggestionsProps {
  setSearch: (val: string) => void;
  activeIndex: number;
  suggestions: Results[];
  handleSearch: (val?: string) => void;
}

function Suggestions({
  setSearch,
  activeIndex,
  suggestions,
  handleSearch,
}: SuggestionsProps) {
  return (
    <ul className="absolute z-20 flex flex-col gap-1 p-2 rounded-xl bg-neutral-800 border border-neutral-700 left-0 right-0 top-full mt-3">
      {suggestions.map((sug, i) => (
        <Fragment key={sug.id}>
          <li
            className={`py-2.5 px-2 rounded-lg font-medium text-[16px] text-white leading-[120%] cursor-pointer hover:bg-neutral-700 border border-transparent transition duration-300 focus:outline-none ${
              activeIndex === i && "bg-neutral-700 border-neutral-600"
            }`}
            onClick={() => {
              setSearch(sug.name);
              handleSearch();
            }}
          >
            {`${sug.name}, ${sug.country}`}
          </li>
        </Fragment>
      ))}
    </ul>
  );
}

export default Suggestions;
