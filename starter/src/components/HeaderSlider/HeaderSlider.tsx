import { useEffect } from "react";
import { useApiStore } from "../../store/user-store";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieInterface } from "../../store/types";

export const HeaderSlider = () => {
  const { movies, loading, error, fetchMovies } = useApiStore();

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!movies) return null;

  const headerMovies = movies.filter(
    (movie: MovieInterface) => movie.popularity
  );

  return (
    <div className="slide-container">
      <div className="slider-inner">
        {headerMovies.map((movie: MovieInterface) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};
