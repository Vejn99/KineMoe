import "./home-page.css";
import { Link } from "react-router-dom";
import { Navigation } from "../../components/Navigation/Navigation";
import { NewRealiseSlider } from "../../components/NewRealiseSlider/NewRealiseSlider";
import { RecommendationSlider } from "../../components/RecommendationSlider/RecommendationSlider";
import { PodcastSlider } from "../../components/PodcastSlider/PodcastSlider";
import { KidsSlider } from "../../components/KidsSlider/KidsSlider";
import { HeaderSlider } from "../../components/HeaderSlider/HeaderSlider";
import { PopularSlider } from "../../components/PopularSlider/PopularSlider";
import { Footer } from "../../components/Footer/Footer";

const Homepage = () => {
  return (
    <div className="home-container">
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
                <div>
                  <HeaderSlider />
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
                <div>
                  <HeaderSlider />
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
                <div>
                  <HeaderSlider />
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
                <div>
                  <HeaderSlider />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to={"/search"}>
          <img
            src="./images/HomePage/Icons/icon15.png"
            alt="icon"
            className="search-icon"
          />{" "}
        </Link>
      </header>
      <div className="main-container">
        <PopularSlider />
        <NewRealiseSlider />
        <div className="banner m-img">
          <h4>Coming soon</h4>
          <img src="./images/HomePage/Banners/image1.png" alt="banner 1" />
        </div>
        <RecommendationSlider />
        <div className="banner m-img2">
          <img src="./images/HomePage/Banners/image2.png" alt="banner 2" />
        </div>
        <PodcastSlider />
        <KidsSlider />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
