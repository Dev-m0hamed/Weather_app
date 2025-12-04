import { useState, useEffect } from "react";
import useSearch from "../../hooks/useSearch";
import debounce from "../../hooks/debounce";
import type { Results } from "../../hooks/debounce";
import useSearchStore from "../../store/useSearchStore";
import Suggestions from "./Suggestions";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [suggestions, setSuggestions] = useState<Results[]>([]);

  const { data, isLoading, isError } = useSearch(value);
  const { setData } = useSearchStore();

  useEffect(() => {
    if (data || isError) {
      setData({ data, isError });
    }
  }, [data, isError, setData]);

  const handleSearch = (val = search) => {
    if (val.trim()) {
      setValue(search);
      setSuggestions([]);
      setActiveIndex(0);
      setSearch("");
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.trim()) {
      const result = await debounce(e.target.value);
      setSuggestions(result);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length === 0) handleSearch(search);
    if (suggestions.length === 0) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % suggestions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(
          (prev) => (prev - 1 + suggestions.length) % suggestions.length
        );
        break;
      case "Enter":
        e.preventDefault();
        handleSearch(suggestions[activeIndex].name);
        break;
    }
  };

  return (
    <section className="flex flex-col gap-3 md:flex-row md:gap-4 lg:w-[656px] lg:mx-auto">
      <label
        htmlFor="search"
        className="relative bg-neutral-800 text-neutral-200 rounded-xl px-6 py-4 flex items-center gap-4 cursor-text transition duration-300 hover:bg-neutral-700 outline-2 outline-transparent outline-offset-3 focus-within:outline-neutral-0 md:flex-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="none"
          viewBox="0 0 21 21"
        >
          <path
            fill="currentColor"
            d="M19.844 18.82c.195.196.195.508 0 .664l-.899.899c-.156.195-.468.195-.664 0l-4.726-4.727a.63.63 0 0 1-.117-.351v-.508c-1.446 1.21-3.282 1.953-5.313 1.953A8.119 8.119 0 0 1 0 8.625C0 4.172 3.633.5 8.125.5c4.453 0 8.125 3.672 8.125 8.125 0 2.031-.781 3.906-1.992 5.313h.508c.117 0 .234.078.351.156l4.727 4.726ZM8.125 14.875a6.243 6.243 0 0 0 6.25-6.25c0-3.438-2.813-6.25-6.25-6.25a6.243 6.243 0 0 0-6.25 6.25 6.219 6.219 0 0 0 6.25 6.25Z"
          />
        </svg>
        <input
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={search}
          id="search"
          type="text"
          className="font-medium leading-[120%] text-[20px] outline-none border-none placeholder:text-neutral-200"
          placeholder="Search for a place..."
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute p-2 rounded-xl bg-neutral-800 border border-neutral-700 left-0 right-0 top-full mt-3 h-[55px]">
            <div className="flex items-center gap-2.5 px-2 py-2.5 rounded-lg text-neutral-0">
              <svg
                className="animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="19"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#fff"
                  d="M9.25 1.5c0 .719-.563 1.25-1.25 1.25-.719 0-1.25-.531-1.25-1.25C6.75.812 7.281.25 8 .25c.688 0 1.25.563 1.25 1.25ZM8 13.25c.688 0 1.25.563 1.25 1.25 0 .719-.563 1.25-1.25 1.25-.719 0-1.25-.531-1.25-1.25 0-.688.531-1.25 1.25-1.25ZM15.75 8c0 .719-.563 1.25-1.25 1.25-.719 0-1.25-.531-1.25-1.25 0-.688.531-1.25 1.25-1.25.688 0 1.25.563 1.25 1.25Zm-13 0c0 .719-.563 1.25-1.25 1.25C.781 9.25.25 8.719.25 8c0-.688.531-1.25 1.25-1.25.688 0 1.25.563 1.25 1.25Zm.625-5.844c.719 0 1.25.563 1.25 1.25 0 .719-.531 1.25-1.25 1.25-.688 0-1.25-.531-1.25-1.25 0-.687.563-1.25 1.25-1.25Zm9.219 9.219c.687 0 1.25.531 1.25 1.25 0 .688-.563 1.25-1.25 1.25-.719 0-1.25-.563-1.25-1.25 0-.719.531-1.25 1.25-1.25Zm-9.219 0c.719 0 1.25.531 1.25 1.25 0 .688-.531 1.25-1.25 1.25-.688 0-1.25-.563-1.25-1.25 0-.719.563-1.25 1.25-1.25Z"
                />
              </svg>
              <span className="font-medium text-[16px] leading-[120%]">
                Search in progress
              </span>
            </div>
          </div>
        )}
        {suggestions.length > 0 && (
          <Suggestions
            suggestions={suggestions}
            setSearch={setSearch}
            handleSearch={handleSearch}
            activeIndex={activeIndex}
          />
        )}
      </label>
      <button
        className="px-6 py-4 rounded-xl bg-blue-500 text-neutral-0 text-[20px] font-medium leading-[120%] cursor-pointer transition duration-300 outline-2 outline-transparent outline-offset-3 hover:bg-blue-700 focus:outline-blue-500"
        onClick={() => handleSearch()}
      >
        Search
      </button>
    </section>
  );
}

export default SearchBar;
