import "./landing-page.css";
import logo from "../../Logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArtistsSlider } from "../../components/ArtistsSlider/ArtistsSlider";
import { ArtistInterface } from "../../store/types";

const artists = [
  {
    id: 1,
    name: "Igor dzambazov",
    img: "./images/LandingPage/Artists/image1.png",
    about: "",
    movies: [],
    awards: [""],
  },
  {
    id: 2,
    name: "Rade sherbedzija",
    img: "./images/LandingPage/Artists/image2.png",
    about: "",
    movies: [],
    awards: [""],
  },
  {
    id: 3,
    name: "Toni mihajlovski",
    img: "./images/LandingPage/Artists/image3.png",
    about: "",
    movies: [],
    awards: [""],
  },
  {
    id: 4,
    name: "Sasko kocev",
    img: "./images/LandingPage/Artists/image4.png",
    about: "",
    movies: [],
    awards: [""],
  },
];

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const setHandleScroll = () => {
    const iconsPop = document.querySelector(".icons-pop");
    if (iconsPop) {
      const iconsPopPosition = iconsPop.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      setIsVisible(iconsPopPosition < windowHeight / 1.2);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", setHandleScroll);

    setHandleScroll();
    return () => window.removeEventListener("scroll", setHandleScroll);
  }, []);

  const renderArtists = () => {
    return artists.map((artist: ArtistInterface) => {
      return (
        <ArtistsSlider
          key={artist.id}
          id={artist.id}
          name={artist.name}
          img={artist.img}
        />
      );
    });
  };
  return (
    <>
      <div className="banner-content font-lato">
        <div className="banner-inner ">
          <img className="banner-logo" src={logo} alt="Kinemoe logo" />
          <div className="banner-text ">
            <h1>Explore, engage & express yourself</h1>
            <p>Watch, learn, collaborate beyond the screen</p>
          </div>
          <Link to="/login" className="login-btn">
            Sign up/Log in
          </Link>
          <div className="banner-movies d-flex ">
            <div className="movie-img">
              <div className="imdb">
                <p>imdb</p>
                <span>3.7</span>/10
              </div>
              <img
                src="./images/LandingPage/HeaderMovies/image1.png"
                alt="image1"
                style={{ height: "320px", marginTop: "150px" }}
              />
            </div>
            <div className="movie-img">
              <div className="imdb">
                <p>imdb</p>
                <span>4.2</span>/10
              </div>
              <img
                src="./images/LandingPage/HeaderMovies/image2.png"
                alt="image2"
                style={{ height: "360px", marginTop: "110px" }}
              />
            </div>
            <div className="movie-img">
              <div className="imdb">
                <p>imdb</p>
                <span>5.4</span>/10
              </div>
              <img
                src="./images/LandingPage/HeaderMovies/image3.png"
                alt="image3"
                style={{ height: "400px", marginTop: "70px" }}
              />
            </div>
            <div className="movie-img">
              <div className="imdb">
                <p>imdb</p>
                <span>8.1</span>/10
              </div>
              <img
                src="./images/LandingPage/HeaderMovies/image4.png"
                alt="image4"
                style={{ height: "440px", marginTop: "30px" }}
              />
            </div>
            <div className="movie-img">
              <div className="imdb">
                <p>imdb</p>
                <span>5.7</span>/10
              </div>
              <img
                src="./images/LandingPage/HeaderMovies/image5.png"
                alt="image5"
                style={{ height: "400px", marginTop: "70px" }}
              />
            </div>
            <div className="movie-img">
              <div className="imdb">
                <p>imdb</p>
                <span>3.8</span>/10
              </div>
              <img
                src="./images/LandingPage/HeaderMovies/image6.png"
                alt="image6"
                style={{ height: "360px", marginTop: "110px" }}
              />
            </div>
            <div className="movie-img">
              <div className="imdb">
                <p>imdb</p>
                <span>4.5</span>/10
              </div>
              <img
                src="./images/LandingPage/HeaderMovies/image7.png"
                alt="image7"
                style={{
                  height: "320px",
                  marginTop: "150px",
                }}
              />
            </div>
          </div>
        </div>
        <div className="gallery-banner">
          <div className="background"> </div>
        </div>
      </div>
      <div className="main-container ">
        <div className={`icons-pop ${isVisible ? "visible" : ""}`}>
          <div className="icon">
            <img src="./images/LandingPage/Icons/icon1.png" alt="icon1" />
            <p>Streaming Platform</p>
          </div>
          <div className="icon">
            <img src="./images/LandingPage/Icons/icon2.png" alt="icon2" />
            <p>Community hub for artists</p>
          </div>
          <div className="icon">
            <img src="./images/LandingPage/Icons/icon3.png" alt="icon3" />
            <p>Platform for sharing culture</p>
          </div>
          <div className="icon">
            <img src="./images/LandingPage/Icons/icon4.png" alt="icon4" />
            <p>Social business model</p>
          </div>
          <div className="icon">
            <img src="./images/LandingPage/Icons/icon5.png" alt="icon5" />
            <p>Support for emerging talent</p>
          </div>
        </div>
        <div className="rooms-container">
          <div className="card-container">
            <div className="card-inner">
              <h4>Movie Room</h4>
              <img
                src="./images/LandingPage/MovieSeriesRoom/image1.png"
                alt="image1"
              />
              <img
                src="./images/LandingPage/MovieSeriesRoom/image2.png"
                alt="image2"
              />
              <img
                src="./images/LandingPage/MovieSeriesRoom/image3.png"
                alt="image3"
              />
              <img
                src="./images/LandingPage/MovieSeriesRoom/image4.png"
                alt="image4"
              />
              <img
                src="./images/LandingPage/MovieSeriesRoom/image5.png"
                alt="image5"
              />
            </div>
            <div className="card-inner">
              <h4>Kids Room</h4>
              <img
                src="./images/LandingPage/KidsRoom/image1.png"
                alt="image1"
              />
              <img
                src="./images/LandingPage/KidsRoom/image2.png"
                alt="image2"
              />
              <img
                src="./images/LandingPage/KidsRoom/image3.png"
                alt="image3"
              />
              <img
                src="./images/LandingPage/KidsRoom/image4.png"
                alt="image4"
              />
              <img
                src="./images/LandingPage/KidsRoom/image5.png"
                alt="image5"
              />
            </div>
            <div className="card-inner">
              <h4>Doc. Room</h4>
              <img src="./images/LandingPage/DocRoom/image1.png" alt="image1" />
              <img src="./images/LandingPage/DocRoom/image2.png" alt="image2" />
              <img src="./images/LandingPage/DocRoom/image3.png" alt="image3" />
              <img src="./images/LandingPage/DocRoom/image4.png" alt="image4" />
              <img src="./images/LandingPage/DocRoom/image5.png" alt="image5" />
            </div>
          </div>
          <div className="card-container">
            <div className="card-inner">
              <h4>Podcast</h4>
              <img
                src="./images/LandingPage/Podcasts/image1.png"
                alt="image1"
              />
              <img
                src="./images/LandingPage/Podcasts/image2.png"
                alt="image2"
              />
              <img
                src="./images/LandingPage/Podcasts/image3.png"
                alt="image3"
              />
              <img
                src="./images/LandingPage/Podcasts/image4.png"
                alt="image4"
              />
              <img
                src="./images/LandingPage/Podcasts/image5.png"
                alt="image5"
              />
            </div>
            <div className="card-inner">
              <h4>Tv Series</h4>
              <img
                src="./images/LandingPage/MovieSeriesRoom/image1.png"
                alt="image1"
              />
              <img
                src="./images/LandingPage/MovieSeriesRoom/image2.png"
                alt="image2"
              />
              <img
                src="./images/LandingPage/MovieSeriesRoom/image3.png"
                alt="image3"
              />
              <img
                src="./images/LandingPage/MovieSeriesRoom/image4.png"
                alt="image4"
              />
              <img
                src="./images/LandingPage/MovieSeriesRoom/image5.png"
                alt="image5"
              />
            </div>
          </div>
        </div>
        <div className="artists-container pb-5">
          <h2>Meet the artists</h2>
          <div className="artists-slider"> {renderArtists()}</div>
        </div>
        <div className="second-banner">
          <img src="./images/LandingPage/Banner/image1.png" alt="banner 1" />
        </div>
        <div className="options-container">
          <div className="option-card">
            <h4>Watch wih ads</h4>
            <h5>Free</h5>
            <div className="card-inner">
              <p>Access to a Vast Library</p>
              <p>Unlimited Streaming</p>
              <p>Multiple Devices</p>
              <p>No Subscription Fee</p>
            </div>
            <Link to="/register" className="login-btn">
              Register
            </Link>
          </div>
          <div className="middle-card">
            <h3>Optional choice</h3>
            <div className="option-card">
              <h4>Pay to watch</h4>
              <h5>499den./month</h5>
              <div className="card-inner">
                <p>Access to a Vast Library</p>
                <p>Unlimited Streaming</p>
                <p>Multiple Devices</p>
                <p>Watch without ads</p>
                <p>Offline Viewing</p>
              </div>
              <Link to="/register" className="login-btn">
                Register
              </Link>
            </div>
          </div>
          <div className="option-card">
            <h4>Engage and receive points</h4>
            <h5>Watch with points</h5>
            <div className="card-inner">
              <p>Earn points when you engage</p>
              <p>Claim rewards with earned points</p>
              <p>No Subscription Fee</p>
            </div>
            <Link to="/register" className="login-btn">
              Register
            </Link>
          </div>
        </div>
      </div>
      <footer className="footer-container">
        <p>
          Kinemoe.mk&copy; <span>2024</span>
        </p>
        <img className="banner-logo" src={logo} alt="Kinemoe logo" />
      </footer>
    </>
  );
};

export default LandingPage;
