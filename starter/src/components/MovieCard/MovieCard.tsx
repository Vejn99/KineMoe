import "./movie-card.css";
import { ArtistInterface, MovieInterface } from "../../store/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArtistMovies } from "../ArtistMovies/ArtistMovies";

const artists = [
  {
    id: 1,
    name: "Игор Џамбазов",
    img: "./images/LandingPage/Artists/image1.png",
    about:
      "Игор Џамбазов е македонски глумец, комичар и писател. Роден е на 6 декември 1963 година во Скопје, Македонија. Има изразена кариера како комичар, ама и како актер во бројни филмови и телевизиски серии. Познат е по своите комични настапи и хумористични предавања.",
    movies: [1, 3, 6, 9, 11, 13, 16, 17, 18, 20],
    awards: [
      "Награда за најдобар глумец на фестивалот Јоаким Интер Фест (2010)",
      " Награда за најдобро глумечко остварување на МТФ Војдан Чернодрински Прилеп за улогата за Ефрем Поплавски во претставата Вечната куќа (2013)",
      " Награда 13 ноември на град Скопје (2022)",
    ],
  },
  {
    id: 2,
    name: "Раде Шербеджија",
    img: "./images/LandingPage/Artists/image2.png",
    about:
      "Раде Шербеджија е македонско-хрватски глумец, познат по своите улоги во бројни филмови и телевизиски серии. Роден е на 27 јули 1946 година во Бањица, Македонија. Има богата кариера во светскиот филм и театар и е еден од најпознатите балкански глумци.",
    movies: [2, 7, 8, 10, 12, 14, 15, 19, 21, 22],

    awards: [
      "Награда за најдобар глумец на фестивалот Јоаким Интер Фест (2010)",
      " Награда за најдобро глумечко остварување на МТФ Војдан Чернодрински Прилеп за улогата за Ефрем Поплавски во претставата Вечната куќа (2013)",
      " Награда 13 ноември на град Скопје (2022)",
    ],
  },
  {
    id: 3,
    name: "Тони Михајловски",
    img: "./images/LandingPage/Artists/image3.png",
    about:
      "Михајловски е роден во Куманово на 1 јули 1967 година. Тој по завршувањето на Факултет за драмски уметност во Скопје, станува член на Драмата при Македонски народен театар во 1994 година. Во 2010 тој станал добитник на наградата за најдобар глумец на петтиот меѓународен театарски фестивал „Јоаким Интер фест“ во Крагуевац, Србија",
    movies: [4, 5, 23, 24, 25, 26, 27, 28, 29, 30],

    awards: [
      "Награда за најдобар глумец на фестивалот Јоаким Интер Фест (2010)",
      " Награда за најдобро глумечко остварување на МТФ Војдан Чернодрински Прилеп за улогата за Ефрем Поплавски во претставата Вечната куќа (2013)",
      " Награда 13 ноември на град Скопје (2022)",
    ],
  },
  {
    id: 4,
    name: "Сашко Коцев",
    img: "./images/LandingPage/Artists/image4.png",
    about:
      "Сашко Коцев е македонски глумец и режисер. Роден е на 18 јуни 1964 година во Скопје, Македонија. Има успешна кариера како глумец во македонскиот филм и театар, а исто така и како режисер на неколку филмови и телевизиски серии.",
    movies: [31, 32, 33],

    awards: [
      "Награда за најдобар глумец на фестивалот Јоаким Интер Фест (2010)",
      " Награда за најдобро глумечко остварување на МТФ Војдан Чернодрински Прилеп за улогата за Ефрем Поплавски во претставата Вечната куќа (2013)",
      " Награда 13 ноември на град Скопје (2022)",
    ],
  },
];

export const MovieCard = (movieProps: MovieInterface) => {
  const [moviePopUp, setMoviePopUp] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<ArtistInterface | null>(
    null
  );

  const openMoviePopUp = () => {
    setMoviePopUp(!moviePopUp);
    document.body.style.overflow = moviePopUp ? "auto" : "hidden";
  };

  const closeMoviePopUp = () => {
    setMoviePopUp(false);
    document.body.style.overflow = "auto";
  };

  const openArtistPopUp = (artistId: number) => {
    closeMoviePopUp();
    const artist = artists.find((artist) => artist.id === artistId);
    if (artist) {
      setSelectedArtist(artist);
      document.body.style.overflow = selectedArtist ? "auto" : "hidden";
    }
  };

  const closeArtistPopUp = () => {
    setSelectedArtist(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    if (!localStorage.getItem("favoriteMovie")) {
      localStorage.setItem("favoriteMovie", "[]");
    }
    if (!localStorage.getItem("wishMovie")) {
      localStorage.setItem("wishMovie", "[]");
    }

    const favoriteMovies = JSON.parse(
      localStorage.getItem("favoriteMovie") || "[]"
    );
    const isFav = favoriteMovies.some(
      (fav: MovieInterface) => fav.id === movieProps.id
    );
    setIsFavorite(isFav);
  }, [movieProps.id]);

  const toggleFavorite = (movie: MovieInterface) => {
    let favoriteMovies = JSON.parse(
      localStorage.getItem("favoriteMovie") || "[]"
    );
    const movieIndex = favoriteMovies.findIndex(
      (fav: MovieInterface) => fav.id === movie.id
    );
    if (movieIndex === -1) {
      favoriteMovies.push(movie);
      setIsFavorite(true);
    } else {
      favoriteMovies.splice(movieIndex, 1);
      setIsFavorite(false);
    }
    localStorage.setItem("favoriteMovie", JSON.stringify(favoriteMovies));
  };

  const toggleWish = (movie: MovieInterface) => {
    let wishMovies = JSON.parse(localStorage.getItem("wishMovie") || "[]");
    const movieIndex = wishMovies.findIndex(
      (wish: MovieInterface) => wish.id === movie.id
    );
    if (movieIndex === -1) {
      wishMovies.push(movie);
    } else {
      wishMovies.splice(movieIndex, 1);
    }
    localStorage.setItem("wishMovie", JSON.stringify(wishMovies));
  };

  return (
    <div className="font-lato">
      <div className="movie-card" onClick={openMoviePopUp}>
        <img src={movieProps.image} alt={movieProps.title} />
      </div>
      {moviePopUp && (
        <>
          <div className="pop-up-overlay"></div>
          <div className="pop-up">
            <div className="pop-up-inner">
              <img
                className="close-icon"
                src="./images/HomePage/Icons/icon17.png"
                alt="icon"
                onClick={closeMoviePopUp}
              />
              <img
                className="pop-up-img"
                src={movieProps.image}
                alt={movieProps.title}
              />
              <div className="movie-description">
                <p>
                  {movieProps.description}
                  <Link to={""} className="see-more">
                    See more...
                  </Link>
                </p>
              </div>
            </div>
            <div className="pop-up-buttons">
              <div className="left-buttons">
                <Link to={"/watch/" + movieProps.id} onClick={closeMoviePopUp}>
                  <img src="./images/HomePage/Icons/icon11.png" alt="icon" />
                  Гледај
                </Link>

                <img
                  src={`./images/HomePage/Icons/${
                    isFavorite ? "icon19.png" : "icon12.png"
                  }`}
                  alt="icon"
                  onClick={() => toggleFavorite(movieProps)}
                />
                <img
                  src="./images/HomePage/Icons/icon13.png"
                  alt="icon"
                  onClick={() => toggleWish(movieProps)}
                />
                <img src="./images/HomePage/Icons/icon14.png" alt="icon" />
              </div>

              <div className="last-img">
                <img src="./images/HomePage/Icons/icon16.png" alt="icon" />
              </div>
            </div>
            <div className="movie-match">
              <p className="m-0"> 100% Match 2024</p>
              <p>16 +</p>
              <p>action,language</p>
            </div>
            <div className="about-info">
              <div className="first-section">
                <p>
                  Genres:
                  <span>
                    {Array.isArray(movieProps.genres)
                      ? movieProps.genres.join(" ")
                      : ""}
                  </span>
                </p>
                <p>
                  Cast:
                  {artists
                    .filter((artist) => artist.movies.includes(movieProps.id))
                    .map((artist) => (
                      <span
                        key={artist.id}
                        onClick={() => openArtistPopUp(artist.id)}
                      >
                        {artist.name}, Ana Petrovic
                      </span>
                    ))}
                </p>
                <p>
                  Director: <span>Svetozar Ristovski</span>
                </p>
              </div>
              <div className="second-section">
                <p>
                  Writers: <span>Svetozar Ristovski, Grace Lea Troje</span>
                </p>
                <p>
                  Produces: <span>Suza Horvat, Michael Johnson</span>
                </p>
                <p>
                  Cinematography: <span>Dejan Dimeski</span>
                </p>
              </div>
              <div className="third-section">
                <p>
                  Editing: <span>Atanas Georgiev, David Brown, Stefan</span>
                </p>
                <p>
                  Costume Design:
                  <span>Nevena Caklovic, Katarina Kolumbatovic</span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedArtist && (
        <>
          <div className="pop-up-overlay"></div>
          <div className="artist-pop-up">
            <div className="close-icon" onClick={closeArtistPopUp}>
              <img src="./images/HomePage/Icons/icon17.png" alt="icon" />
            </div>
            <div className="about-artist">
              <img
                src={selectedArtist.img}
                alt={selectedArtist.name}
                className="artist-img"
              />
              <div className="artist-details">
                <h2>{selectedArtist.name}</h2>
                <p>{selectedArtist.about}</p>
                <Link to={""}>See more</Link>
              </div>
            </div>
            <div className="movies">
              <ArtistMovies />
            </div>
            <ul className="awards">
              {selectedArtist.awards &&
                selectedArtist.awards.map((award, index) => (
                  <li key={index}>{award}</li>
                ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
