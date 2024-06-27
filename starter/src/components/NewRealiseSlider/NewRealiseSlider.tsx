import { useEffect } from "react";
import { useApiStore } from "../../store/user-store";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieInterface } from "../../store/types";

export const NewRealiseSlider = () => {
  const { movies, loading, error, fetchMovies } = useApiStore();

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!movies) return null;

  const newRealiseMovies = movies.filter(
    (movie: MovieInterface) => movie.isNewRelease
  );

  return (
    <div className="slide-container">
      <h4>New Realise</h4>
      <div className="slider-inner">
        {newRealiseMovies.map((movie: MovieInterface) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};
