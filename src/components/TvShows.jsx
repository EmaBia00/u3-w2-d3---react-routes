import Filters from "./Filters";
import Gallery from "./Gallery";
const TvShows = () => {
  return (
    <div>
      <Filters />
      <Gallery title="Harry Potter" />
      <Gallery title="Star Wars" />
      <Gallery title="Lord of the Rings" />
    </div>
  );
};

export default TvShows;
