import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";

function Content() {
  return (
    <main className="flex flex-col gap-8">
      <SearchBar />
      <CurrentWeather />
    </main>
  );
}

export default Content;
