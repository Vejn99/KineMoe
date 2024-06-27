import "./profile-page.css";
import { useEffect, useRef, useState } from "react";
import { MovieInterface } from "../../store/types";
import { Navigation } from "../../components/Navigation/Navigation";
import { FormData } from "../Register/RegisterPage";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import DiscussionsGraph from "../../components/DiscussionsGraph/DiscussionsGraph";
import axios from "axios";
import { Comment, Discussion } from "../Community/CommunityPage";
import { useNavigate } from "react-router-dom";
import { ProfileGraph } from "../../components/ProfileGraph/ProfileGraph";

const ProfilePage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<MovieInterface[]>([]);
  const [wishMovies, setWishMovies] = useState<MovieInterface[]>([]);
  const [userData, setUserData] = useState<FormData | null>(null);
  const [discussionData, setDiscussionData] = useState<Discussion[]>([]);
  const [commentData, setCommentData] = useState<Discussion[]>([]);
  const [profileImage, setProfileImage] = useState<string>(
    " /images/SignIn/ProfileImage.png"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const favoriteMovieData = JSON.parse(
      localStorage.getItem("favoriteMovie") || "[]"
    );
    setFavoriteMovies(favoriteMovieData);
  }, []);

  useEffect(() => {
    const wishMovieData = JSON.parse(localStorage.getItem("wishMovie") || "[]");
    setWishMovies(wishMovieData);
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profileImage");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      fetchDiscussionData();
    }
  }, [userData]);

  const fetchDiscussionData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/discussions");
      const data = response.data;

      console.log("All discussions:", data);

      const discussionsWithUserComments = data.filter(
        (discussion: Discussion) =>
          discussion.comments.some(
            (comment: Comment) => comment.viewerName === userData?.username
          ) || discussion.viewerName === userData?.username
      );

      console.log(
        "Discussions with user comments:",
        discussionsWithUserComments
      );

      const userComments = discussionsWithUserComments.flatMap(
        (discussion: Discussion) => discussion.comments
      );

      console.log("User comments:", userComments);

      setDiscussionData(discussionsWithUserComments);
      setCommentData(userComments);

      console.log("Discussion data state:", discussionsWithUserComments);
    } catch (error) {
      console.error("Error fetching discussion data:", error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setProfileImage(reader.result);
          localStorage.setItem("profileImage", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelectPopup = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getFirstName = (username: string) => {
    return username.split(" ")[0];
  };

  const goToDiscussion = (commentId: number) => {
    const comment = commentData.find((comment) => comment.id === commentId);

    if (comment) {
      const discussion = discussionData.find((discussion) =>
        discussion.comments.some((c) => c.id === commentId)
      );

      if (discussion) {
        navigate(`/comment/${discussion.id}`);
      }
    }
  };

  return (
    <div className="profile-container">
      <Navigation />
      <div className="banner-image">
        <div className="profile-icons">
          <img src="/images/HomePage/Icons/icon12.png" alt="hearth icon" />
          <img src="/images/HomePage/Icons/icon13.png" alt="plus icon" />
          <img src="/images/HomePage/Icons/icon14.png" alt="share icon" />
        </div>
      </div>
      <div className="profile-inner">
        <div className="left-side">
          <div className="profile-icon" onClick={triggerFileSelectPopup}>
            <img src={profileImage} alt="Profile image" />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          {userData && (
            <div className="user-details">
              <h2 className="username">{userData.username}</h2>
              <p className="nickname">{userData.nickname}</p>
              <p className="bio">
                {userData.bio} Lorem ipsum dolor sit amet consectetur. At sed
                dui faucibus dictum. Condimentum auctor scelerisque nunc nam.
                Mauris vel commodo hendrerit mattis varius risus massa vitae
                velit. Aenean urna euismod auctor tortor bibendum nunc sed.
              </p>
              <h3>Badges:</h3>
              <div className="badges">
                <img src="/images/SignIn/Badges/icon1.png" alt="icon 1" />
                <img src="/images/SignIn/Badges/icon2.png" alt="icon 2" />
                <img src="/images/SignIn/Badges/icon3.png" alt="icon 3" />
                <img src="/images/SignIn/Badges/icon4.png" alt="icon 4" />
              </div>
              <div className="h-line"></div>
              <div className="graphs">
                <div className="d-flex justify-content-around mt-5">
                  <div className="graph-inner">
                    <ProfileGraph
                      data={discussionData} // Pass discussions data
                      type={"discussion"}
                      username={userData?.username || ""} // Pass username
                      max={20}
                    />
                    <p>Discussions</p>
                  </div>
                  <div className="graph-inner">
                    <ProfileGraph
                      data={commentData} // Pass comments data
                      type={"comment"}
                      username={userData?.username || ""} // Pass username
                      max={20}
                    />
                    <p>Comments</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {userData && (
          <div className="right-side">
            <div className="comments-container">
              <h3>Comments by {getFirstName(userData.username)}:</h3>
              <div className="comments-inner">
                {commentData
                  .filter(
                    (comment) => comment.viewerName === userData?.username
                  )
                  .map((comment) => (
                    <div
                      className="comment"
                      key={comment.id}
                      onClick={() => goToDiscussion(comment.id)}
                    >
                      <div className="d-flex align-items-center">
                        <img src={profileImage} alt="Profile image" />
                        <span>{getFirstName(comment.viewerName)}:</span>
                      </div>
                      <p>{comment.content}</p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="movies-container">
              <h3>What {getFirstName(userData.username)}`s watched:</h3>
              <div className="movies-inner">
                {favoriteMovies.map((movie: MovieInterface) => (
                  <MovieCard key={movie.id} {...movie} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
