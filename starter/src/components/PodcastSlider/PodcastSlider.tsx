import { useEffect } from "react";
import { useApiStore } from "../../store/user-store";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieInterface } from "../../store/types";

export const PodcastSlider = () => {
  const { movies, loading, error, fetchMovies } = useApiStore();

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!movies) return null;

  const podcast = movies.filter((movie: MovieInterface) =>
    movie.genres.includes("Podcast")
  );

  return (
    <div className="slide-container">
      <h4>Podcasts</h4>
      <div className="slider-inner">
        {podcast.map((movie: MovieInterface) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};
