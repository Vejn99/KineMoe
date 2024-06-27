import { useEffect } from "react";
import { useApiStore } from "../../store/user-store";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieInterface } from "../../store/types";

export const KidsSlider = () => {
  const { movies, loading, error, fetchMovies } = useApiStore();

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!movies) return null;

  const animation = movies.filter((movie: MovieInterface) =>
    movie.genres.includes("Animation")
  );

  return (
    <div className="slide-container">
      <h4>Kids</h4>
      <div className="slider-inner">
        {animation.map((movie: MovieInterface) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};
