import { useState } from "react";
import "./artist-movies.css";

const movies = [
  {
    id: 1,
    title: "Movie",
    image: "/images/HomePage/Movies/image18.png",
  },
  {
    id: 2,
    title: "Movie",
    image: "./images/HomePage/Movies/image19.png",
  },
  {
    id: 3,
    title: "Movie",
    image: "./images/HomePage/Movies/image20.png",
  },
  {
    id: 4,
    title: "Movie",
    image: "./images/HomePage/Movies/image21.png",
  },
  {
    id: 5,
    title: "Movie",
    image: "./images/HomePage/Movies/image2.png",
  },
  {
    id: 6,
    title: "Movie",
    image: "./images/HomePage/Movies/image5.png",
  },
  {
    id: 7,
    title: "Movie",
    image: "./images/HomePage/Movies/image7.png",
  },
  {
    id: 8,
    title: "Movie",
    image: "./images/HomePage/Movies/image8.png",
  },
  {
    id: 9,
    title: "Movie",
    image: "./images/HomePage/Movies/image9.png",
  },
  {
    id: 10,
    title: "Movie",
    image: "./images/HomePage/Movies/image10.png",
  },
];

export const ArtistMovies = () => {
  const [transformValue, setTransformValue] = useState(0);

  const handleArrowClick = () => {
    setTransformValue((prevValue) => (prevValue === -100 ? 0 : prevValue - 20));
  };

  return (
    <div className="artist-movies-container">
      <h3>Филмови</h3>
      <div className="movies-inner">
        <div className="movie-slider">
          <div
            className="movie-cards-wrapper"
            style={{ transform: `translateX(${transformValue}%)` }}
          >
            {movies.map((movie) => (
              <div className="movie-cards" key={movie.id}>
                <img src={movie.image} alt={movie.title} />
              </div>
            ))}
          </div>
        </div>
        <div className="right-arrow-carousel" onClick={handleArrowClick}>
          <img src="./images/HomePage/Icons/icon18.png" alt="right arrow" />
        </div>
      </div>
    </div>
  );
};
