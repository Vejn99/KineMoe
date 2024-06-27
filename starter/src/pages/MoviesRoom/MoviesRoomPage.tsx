import "./movies-room-page.css";
import { Link } from "react-router-dom";
import { Navigation } from "../../components/Navigation/Navigation";
import { useEffect, useState } from "react";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { MovieInterface } from "../../store/types";
import { useApiStore } from "../../store/user-store";
import { Footer } from "../../components/Footer/Footer";

const MoviesRoomPage = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>("Categories");
  const [dropdownActive, setDropdownActive] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const { movies, loading, error, fetchMovies } = useApiStore();

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) return <h2 className="text-center">Loading...</h2>;
  if (error) return <h2 className="text-center color-danger">Error</h2>;
  if (!movies) return null;

  const handleSelectChange = (genre: string) => {
    if (genre === "Categories") {
      setDropdownActive(false);
    }
    setSelectedGenre(genre);
    setShowMore(false);
  };

  const popularMovies = movies.filter(
    (movie: MovieInterface) => movie.popularity
  );

  const actionMovies = movies.filter((movie: MovieInterface) =>
    movie.genres.includes("Action")
  );

  const comedyMovies = movies.filter((movie: MovieInterface) =>
    movie.genres.includes("Comedy")
  );

  const horrorMovies = movies.filter((movie: MovieInterface) =>
    movie.genres.includes("Horror")
  );
  const dramaMovies = movies.filter((movie: MovieInterface) =>
    movie.genres.includes("Drama")
  );
  const crimeMovies = movies.filter((movie: MovieInterface) =>
    movie.genres.includes("Crime")
  );
  const scifiMovies = movies.filter((movie: MovieInterface) =>
    movie.genres.includes("Sci-fi")
  );

  const historyMovies = movies.filter((movie: MovieInterface) =>
    movie.genres.includes("History")
  );
  const thrillerMovies = movies.filter((movie: MovieInterface) =>
    movie.genres.includes("Thriller")
  );

  const animationMovies = movies.filter((movie: MovieInterface) =>
    movie.genres.includes("Animation")
  );

  const podcast = movies.filter((movie: MovieInterface) =>
    movie.genres.includes("Podcast")
  );

  const showMoreSliders = () => {
    setShowMore(true);
  };

  return (
    <div className="movie-room-container">
      <header className="header-container">
        <Navigation />
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="carousel-img"
                src="./images/HomePage/Header/image1.png"
                alt="First slide"
              />

              <div className="carousel-captionn">
                <div className="items-container">
                  <img
                    className="caption-img"
                    src="./images/HomePage/Header/caption1.png"
                    alt="caption"
                  />
                  <p>
                    Дезертер од македонската војска и неговиот италијански крвен
                    брат, бараат мртва баба завиткана во украден килим низ
                    криминалниот свет на Балканот.
                  </p>
                  <div className="carousel-buttons">
                    <Link to={"/watch"}>
                      <img
                        src="./images/HomePage/Icons/icon11.png"
                        alt="icon"
                      />
                      Гледај
                    </Link>
                    <img src="./images/HomePage/Icons/icon12.png" alt="icon" />
                    <img src="./images/HomePage/Icons/icon13.png" alt="icon" />
                    <img src="./images/HomePage/Icons/icon14.png" alt="icon" />
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item ">
              <img
                className="carousel-img"
                src="./images/HomePage/Header/image2.png"
                alt="Second slide"
              />
              <div className="carousel-captionn">
                <div className="items-container">
                  <img
                    className="caption-img"
                    src="./images/HomePage/Header/caption2.png"
                    alt="caption"
                  />
                  <p>
                    При шверцување на нелегални личности во Европа, Лазар ќе се
                    соочи со невозможен избор.
                  </p>
                  <div className="carousel-buttons">
                    <Link to={"/watch"}>
                      <img
                        src="./images/HomePage/Icons/icon11.png"
                        alt="icon"
                      />
                      Гледај
                    </Link>
                    <img src="./images/HomePage/Icons/icon12.png" alt="icon" />
                    <img src="./images/HomePage/Icons/icon13.png" alt="icon" />
                    <img src="./images/HomePage/Icons/icon14.png" alt="icon" />
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="carousel-img"
                src="./images/HomePage/Header/image3.png"
                alt="Third slide"
              />
              <div className="carousel-captionn">
                <div className="items-container">
                  <img
                    className="caption-img"
                    src="./images/HomePage/Header/caption3.png"
                    alt="caption"
                  />
                  <p>
                    Македонија е мала земја, во срцето на Балканот, која пет
                    века била под јарамот на Отоманската Империја.
                  </p>
                  <div className="carousel-buttons">
                    <Link to={"/watch"}>
                      <img
                        src="./images/HomePage/Icons/icon11.png"
                        alt="icon"
                      />
                      Гледај
                    </Link>
                    <img src="./images/HomePage/Icons/icon12.png" alt="icon" />
                    <img src="./images/HomePage/Icons/icon13.png" alt="icon" />
                    <img src="./images/HomePage/Icons/icon14.png" alt="icon" />
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="carousel-img"
                src="./images/HomePage/Header/image4.png"
                alt="Forth slide"
              />
              <div className="carousel-captionn">
                <div className="items-container">
                  <img
                    className="caption-img"
                    src="./images/HomePage/Header/caption4.png"
                    alt="caption"
                  />
                  <p>
                    Фудбалер кој игра за македонскиот фудбалски клуб се заљубува
                    во Еврејка. Но, нивната среќа е загрозена од новата
                    нацистичка влада, која пука и во еврејскиот тренер на
                    клубот.
                  </p>
                  <div className="carousel-buttons">
                    <Link to={"/watch"}>
                      <img
                        src="./images/HomePage/Icons/icon11.png"
                        alt="icon"
                      />
                      Гледај
                    </Link>
                    <img src="./images/HomePage/Icons/icon12.png" alt="icon" />
                    <img src="./images/HomePage/Icons/icon13.png" alt="icon" />
                    <img src="./images/HomePage/Icons/icon14.png" alt="icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" selectbox">
          <div
            className={`dropdown ${dropdownActive ? "active" : ""}`}
            id="dropdown"
          >
            <div
              className="input-control"
              onClick={() => setDropdownActive(!dropdownActive)}
            >
              <input
                type="text"
                className="textBox"
                value={selectedGenre}
                readOnly
              />
              <div className="option">
                {[
                  "Categories",
                  "Popular",
                  "Action",
                  "Comedy",
                  "Horror",
                  "Drama",
                  "History",
                  "Crime",
                  "Sci-fi",
                  "Thriller",
                  "Animation",
                  "Podcast",
                ].map((genre) => (
                  <div key={genre} onClick={() => handleSelectChange(genre)}>
                    {genre}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Link to={"/search"}>
          <img
            src="./images/HomePage/Icons/icon15.png"
            alt="icon"
            className="search-icon"
          />
        </Link>
      </header>

      <div className="movie-categories">
        {(selectedGenre === "Popular" || selectedGenre === "Categories") && (
          <div className="slide-container">
            <h4>Популарно</h4>
            <div className="slider-inner">
              {popularMovies.map((movie: MovieInterface) => (
                <MovieCard key={movie.id} {...movie} />
              ))}
            </div>
          </div>
        )}
        {(selectedGenre === "Action" || selectedGenre === "Categories") && (
          <div className="slide-container">
            <h4>Акција</h4>
            <div className="slider-inner">
              {actionMovies.map((movie: MovieInterface) => (
                <MovieCard key={movie.id} {...movie} />
              ))}
            </div>
          </div>
        )}
        {(selectedGenre === "Comedy" || selectedGenre === "Categories") && (
          <div className="slide-container">
            <h4>Комедија</h4>
            <div className="slider-inner">
              {comedyMovies.map((movie: MovieInterface) => (
                <MovieCard key={movie.id} {...movie} />
              ))}
            </div>
          </div>
        )}
        {(selectedGenre === "Horror" || selectedGenre === "Categories") && (
          <div className="slide-container">
            <h4>Хорор</h4>
            <div className="slider-inner">
              {horrorMovies.map((movie: MovieInterface) => (
                <MovieCard key={movie.id} {...movie} />
              ))}
            </div>
          </div>
        )}
        {(selectedGenre === "Drama" || selectedGenre === "Categories") && (
          <div className="slide-container">
            <h4>Драма</h4>
            <div className="slider-inner">
              {dramaMovies.map((movie: MovieInterface) => (
                <MovieCard key={movie.id} {...movie} />
              ))}
            </div>
          </div>
        )}
        {(selectedGenre === "History" || selectedGenre === "Categories") && (
          <div className="slide-container">
            <h4>Историја</h4>
            <div className="slider-inner">
              {historyMovies.map((movie: MovieInterface) => (
                <MovieCard key={movie.id} {...movie} />
              ))}
            </div>
          </div>
        )}
        {!showMore && selectedGenre === "Categories" && (
          <div className="show-more-container">
            <button onClick={showMoreSliders} className="show-more-button">
              Show More
            </button>
          </div>
        )}
        {showMore && (
          <>
            {(selectedGenre === "Crime" || selectedGenre === "Categories") && (
              <div className="slide-container">
                <h4>Криминалистика</h4>
                <div className="slider-inner">
                  {crimeMovies.map((movie: MovieInterface) => (
                    <MovieCard key={movie.id} {...movie} />
                  ))}
                </div>
              </div>
            )}
            {(selectedGenre === "Sci-fi" || selectedGenre === "Categories") && (
              <div className="slide-container">
                <h4>Научна фантастика</h4>
                <div className="slider-inner">
                  {scifiMovies.map((movie: MovieInterface) => (
                    <MovieCard key={movie.id} {...movie} />
                  ))}
                </div>
              </div>
            )}
            {(selectedGenre === "Thriller" ||
              selectedGenre === "Categories") && (
              <div className="slide-container">
                <h4>Трилер</h4>
                <div className="slider-inner">
                  {thrillerMovies.map((movie: MovieInterface) => (
                    <MovieCard key={movie.id} {...movie} />
                  ))}
                </div>
              </div>
            )}
            {(selectedGenre === "Animation" ||
              selectedGenre === "Categories") && (
              <div className="slide-container">
                <h4>Анимација</h4>
                <div className="slider-inner">
                  {animationMovies.map((movie: MovieInterface) => (
                    <MovieCard key={movie.id} {...movie} />
                  ))}
                </div>
              </div>
            )}
            {(selectedGenre === "Podcast" ||
              selectedGenre === "Categories") && (
              <div className="slide-container">
                <h4>Подкаст</h4>
                <div className="slider-inner">
                  {podcast.map((movie: MovieInterface) => (
                    <MovieCard key={movie.id} {...movie} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MoviesRoomPage;
