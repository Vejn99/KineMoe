import "./popular-slider.css";
import { useEffect } from "react";
import { useApiStore } from "../../store/user-store";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieInterface } from "../../store/types";

export const PopularSlider = () => {
  const { movies, loading, error, fetchMovies } = useApiStore();

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) return <h2 className="text-center">Loading...</h2>;
  if (error) return <h2 className="text-center color-danger">Error</h2>;
  if (!movies) return null;

  const popularMovies = movies.filter(
    (movie: MovieInterface) => movie.popularity
  );

  return (
    <div className="slide-container">
      <h4>Popular</h4>
      <div className="slider-inner">
        {popularMovies.map((movie: MovieInterface) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};
