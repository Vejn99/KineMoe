import { Link } from "react-router-dom";
import "./navigation.css";
import { useState } from "react";

export const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav>
        <div className="nav-item mt-5">
          <Link to={"/profile"}>
            <img
              src="/images/HomePage/Icons/icon1.png"
              alt="icon"
              className="nav-img"
            />
          </Link>
          <span className="nav-span">Profile</span>
        </div>
        <div className="middle-icons">
          <div className="nav-item">
            <Link to={"/"}>
              <img
                src="/images/HomePage/Icons/icon2.png"
                alt="icon"
                className="nav-img"
              />
            </Link>
            <span className="nav-span">Home</span>
          </div>
          <div className="nav-item rooms" onClick={toggleDropdown}>
            <img
              src="/images/HomePage/Icons/icon3.png"
              alt="icon"
              className="nav-img"
            />
            <span className="nav-span">Rooms</span>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <div className="dropdown-inner">
                  <div className="dropdown-item">
                    <Link to={"/movies"}>
                      <img
                        src="./images/HomePage/Icons/icon7.png"
                        alt="icon"
                        className="dropdown-icon"
                      />
                      <span className="dropdown-span">Movies</span>
                    </Link>
                  </div>
                  <div className="dropdown-item">
                    <Link to={"/"}>
                      <img
                        src="/images/HomePage/Icons/icon8.png"
                        alt="icon"
                        className="dropdown-icon"
                      />
                      <span className="dropdown-span">Series</span>
                    </Link>
                  </div>
                  <div className="dropdown-item">
                    <Link to={"/"}>
                      <img
                        src="/images/HomePage/Icons/icon9.png"
                        alt="icon"
                        className="dropdown-icon"
                      />
                      <span className="dropdown-span">Podcast</span>
                    </Link>
                  </div>
                  <div className="dropdown-item">
                    <Link to={"/"}>
                      <img
                        src="/images/HomePage/Icons/icon10.png"
                        alt="icon"
                        className="dropdown-icon"
                      />
                      <span className="dropdown-span">Kids</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="nav-item">
            <Link to={"/community"}>
              <img
                src="/images/HomePage/Icons/icon4.png"
                alt="icon"
                className="nav-img"
              />
            </Link>
            <span className="nav-span">Chat</span>
          </div>
          <div className="nav-item">
            <Link to={"/"}>
              <img
                src="/images/HomePage/Icons/icon5.png"
                alt="icon"
                className="nav-img"
              />
            </Link>
            <span className="nav-span">Movie hall</span>
          </div>
        </div>
        <div className="nav-item mb-3">
          <Link to={"/"}>
            <img
              src="/images/HomePage/Icons/icon6.png"
              alt="icon"
              className="nav-img"
            />
          </Link>
          <span className="nav-span">Settings</span>
        </div>
      </nav>
    </>
  );
};
