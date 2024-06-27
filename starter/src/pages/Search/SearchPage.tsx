import "./search-page.css";
import { Navigation } from "../../components/Navigation/Navigation";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { MovieInterface } from "../../store/types";
import { useApiStore } from "../../store/user-store";
import { useEffect, useState, useMemo } from "react";
import { Footer } from "../../components/Footer/Footer";

const SearchPage = () => {
  const { movies, loading, error, fetchMovies } = useApiStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<MovieInterface[]>([]);
  const [similarMovies, setSimilarMovies] = useState<MovieInterface[]>([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const findSimilarMovies = (searchedMovie: MovieInterface) => {
    if (!searchedMovie || !searchedMovie.genres) return [];
    if (!movies) return [];

    const similar = movies.filter(
      (movie) =>
        movie.genres &&
        searchedMovie.genres?.some((genre) => movie.genres.includes(genre))
    );

    return similar.filter((movie) => movie.id !== searchedMovie.id);
  };

  useEffect(() => {
    if (movies) {
      setFilteredMovies(movies);
      setSimilarMovies([]);
    }
  }, [movies]);

  useEffect(() => {
    if (filteredMovies.length === 0) return;
    const searchedMovie = filteredMovies.find((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (searchedMovie) {
      const similar = findSimilarMovies(searchedMovie);
      setSimilarMovies(similar);
    } else {
      setSimilarMovies([]);
    }
  }, [searchQuery, filteredMovies]);

  const filteredMoviesList = useMemo(() => {
    if (!searchQuery) return filteredMovies;
    return filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [filteredMovies, searchQuery]);

  if (loading) return <h2 className="text-center">Loading...</h2>;
  if (error) return <h2 className="text-center color-danger">Error</h2>;

  return (
    <div className="search-room ">
      <Navigation />

      <div className="search-bar">
        <img src="./images/HomePage/Icons/icon15.png" alt="search icon" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="slide-container">
        <h3 className="search-h3">Search Result</h3>
        <div className="slider-inner">
          {filteredMoviesList.map((movie: MovieInterface) => (
            <div key={movie.id}>
              <MovieCard {...movie} />
              <p className="movie-title mt-2">{movie.title}</p>
            </div>
          ))}
        </div>
        <div className="h-line"></div>
      </div>

      {similarMovies.length > 0 && (
        <div className="slide-container p-0">
          <h3 className="search-h3"> Similar results</h3>
          <div className="similar-content">
            {similarMovies.map((movie: MovieInterface) => (
              <div key={movie.id}>
                <MovieCard {...movie} />
                <p className="movie-title mt-2">{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SearchPage;
