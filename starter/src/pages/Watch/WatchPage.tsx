import { useEffect } from "react";
import { useApiStore } from "../../store/user-store";
import { useParams } from "react-router-dom";
import { VideoPlayer } from "../../components/VideoPlayer/VideoPlayer";

const WatchPage = () => {
  const { movies, loading, error, fetchMovies } = useApiStore();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchMovies();
  }, []);

  if (!id) return <h2 className="text-center mt-5">Movie ID not found</h2>;

  if (loading) return <h2 className="text-center">Loading...</h2>;
  if (error) return <h2 className="text-center color-danger">Error</h2>;
  if (!movies) return null;

  const currentMovie = movies.find((movie) => {
    return movie.id === +id;
  });

  if (!currentMovie)
    return <h2 className="text-center mt-5">Movie not found</h2>;

  return (
    <>
      <VideoPlayer {...currentMovie} comments={currentMovie.comments} />
    </>
  );
};

export default WatchPage;
