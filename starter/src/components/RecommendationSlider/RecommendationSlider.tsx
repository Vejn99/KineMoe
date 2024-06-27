import { useEffect } from "react";
import { useApiStore } from "../../store/user-store";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieInterface } from "../../store/types";

export const RecommendationSlider = () => {
  const { movies, loading, error, fetchMovies } = useApiStore();

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!movies) return null;

  const recommendedMovies = movies.sort(() => 0.5 - Math.random()).slice(0, 11);

  return (
    <div className="slide-container">
      <h4>Our recommendation</h4>
      <div className="slider-inner">
        {recommendedMovies.map((movie: MovieInterface) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};
