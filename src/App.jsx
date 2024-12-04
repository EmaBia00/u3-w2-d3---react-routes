import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

// HOMEPAGE IMPORT
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import TvShows from "./components/TvShows";
import ProfileUser from "./components/ProfileUser";
import MovieDetails from "./components/MovieDetails";
const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <div className="flex-grow-1">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tvshows" element={<TvShows />} />
            <Route path="/profile-user/" element={<ProfileUser />} />
            <Route path="/movie-details/:movieId" element={<MovieDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

const Home = () => {
  return <h1 className="text-center">Welcome to the Home Page!</h1>;
};

export default App;
