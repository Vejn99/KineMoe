import "./video-player.css";
import { MovieInterface, CommentInterface } from "../../store/types";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const VideoPlayer = ({ comments, ...movieProps }: MovieInterface) => {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [mouseMoving, setMouseMoving] = useState(false);
  const [mouseInPlace, setMouseInPlace] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [movieComments, setMovieComments] =
    useState<CommentInterface[]>(comments);
  const [userData, setUserData] = useState<{ username: string } | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      console.error("No user data found in local storage");
    }
  }, []);

  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profileImage");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    } else {
      console.error("No profile image found in local storage");
    }
  }, []);

  const toggleBtn = () => {
    setButtonDisabled(!commentValue);
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(videoRef?.current?.currentTime || 0);
      const progress = (currentTime / duration) * 100;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress}%`;
      }
    };

    const updateDuration = () => {
      setDuration(videoRef?.current?.duration || 0);
    };

    let timeout: NodeJS.Timeout;

    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", updateTime);
      videoRef.current.addEventListener("loadedmetadata", updateDuration);

      videoRef.current.addEventListener("mousemove", () => {
        clearTimeout(timeout);
        if (!showControls) {
          setShowControls(true);
        }
        timeout = setTimeout(() => {
          if (!mouseMoving && !mouseInPlace) {
            setShowControls(false);
          }
        }, 3000);
      });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", updateTime);
        videoRef.current.removeEventListener("loadedmetadata", updateDuration);
        videoRef.current.removeEventListener("mousemove", () => {
          clearTimeout(timeout);
          if (!showControls) {
            setShowControls(true);
          }
          timeout = setTimeout(() => {
            if (!mouseMoving && !mouseInPlace) {
              setShowControls(false);
            }
          }, 3000);
        });
      }
      clearTimeout(timeout);
    };
  }, [showControls, mouseMoving, mouseInPlace, currentTime, duration]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = Math.floor(time - hours * 3600 - minutes * 60);

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const handlePlay = () => {
    if (videoRef.current) {
      if (videoIsPlaying) {
        videoRef.current.pause();
        setIsPaused(true);
      } else {
        videoRef.current.play();
        setIsPaused(false);
      }
      setVideoIsPlaying((prevState) => !prevState);
    }
  };

  const handleBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 5;
    }
  };

  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 5;
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted((prevState) => !prevState);
    }
  };

  const onSubmitHandler = (event: any) => {
    if (!userData || !profileImage) {
      console.log(
        "No information about user or profile image found in local storage"
      );
      return;
    }

    event.preventDefault();
    if (commentValue.trim() === "") return;

    const newComment: CommentInterface = {
      id: Math.floor(Math.random() * 1000),
      userId: Math.floor(Math.random() * 1000),
      userName: userData?.username,
      comment: commentValue,
      time: Math.floor(currentTime),
    };

    toggleBtn();

    setMovieComments((prevComments) => [...prevComments, newComment]);

    fetch(`http://localhost:5001/movies/${movieProps.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movie");
        }
        return response.json();
      })
      .then((movieData) => {
        const updatedMovie = {
          ...movieData,
          comments: [...movieData.comments, newComment],
        };

        return fetch(`http://localhost:5001/movies/${movieProps.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMovie),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update movie");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Movie updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating movie:", error);
      });

    setCommentValue("");
  };

  return (
    <div
      className="video-container"
      key={movieProps.id}
      onMouseMove={() => setMouseMoving(true)}
    >
      <video
        className="video"
        ref={videoRef}
        onPlay={() => setVideoIsPlaying(true)}
        onPause={() => setVideoIsPlaying(false)}
        onMouseMove={() => {
          setMouseMoving(true);
          setShowControls(true);
        }}
      >
        <source src={movieProps.link} />
      </video>

      {showControls && (
        <>
          <Link to="/" className="back-icon">
            <img src="/images/WatchPage/icon1.png" alt="Back icon" />
          </Link>
          <div className="info-icon">
            <img src="/images/WatchPage/icon11.png" alt="Info icon" />
          </div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${(currentTime / duration) * 100}%`,
              }}
            ></div>
          </div>
          <div
            className="controls"
            ref={controlsRef}
            onMouseEnter={() => setMouseInPlace(true)}
            onMouseLeave={() => setMouseInPlace(false)}
          >
            <div className="timer">
              <p>
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>
            </div>

            <div className="middle-controls">
              <button onClick={handleBackward}>
                <img src="/images/WatchPage/icon2.png" alt="Backwards icon" />
              </button>
              <button onClick={handlePlay}>
                <img src="/images/WatchPage/icon3.png" alt="Play icon" />
              </button>
              <button onClick={handleForward}>
                <img src="/images/WatchPage/icon4.png" alt="Forward icon" />
              </button>
            </div>
            <div className="end-controls">
              <button>
                <img src="/images/WatchPage/icon5.png" alt="Trailer icon" />
              </button>
              <button>
                <img src="/images/WatchPage/icon6.png" alt="Subtitles icon" />
              </button>
              <button onClick={handleMute}>
                {muted ? (
                  <img src="/images/WatchPage/icon8.png" alt="Mute icon" />
                ) : (
                  <img src="/images/WatchPage/icon7.png" alt="Unmute icon" />
                )}
              </button>
              <button onClick={() => setShowComments((prev) => !prev)}>
                {showComments ? (
                  <img src="/images/WatchPage/icon10.png" alt="Hide icon" />
                ) : (
                  <img src="/images/WatchPage/icon9.png" alt="Show icon" />
                )}
              </button>
            </div>
          </div>
        </>
      )}
      <div className="comments">
        {showComments &&
          !videoIsPlaying &&
          comments.map((comment: CommentInterface) => {
            return (
              <div
                key={comment.id}
                className={`comment-box ${
                  currentTime >= comment.time ? "show" : "hide"
                }`}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={
                      comment.userName === userData?.username
                        ? profileImage || ""
                        : comment.icon || ""
                    }
                    alt="profile icon"
                  />
                  <p className="m-0">{comment.userName}:</p>
                </div>
                <p className="m-0">{comment.comment}</p>
              </div>
            );
          })}
        {showComments && !videoIsPlaying && (
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              name="comment"
              placeholder="Leave a comment"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
            />
            <button type="submit" disabled={!commentValue.trim()}>
              <img src="/images/WatchPage/icon12.png" alt="Add icon" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
