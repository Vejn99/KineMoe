import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./community-page.css";
import { Navigation } from "../../components/Navigation/Navigation";
import DiscussionsGraph from "../../components/DiscussionsGraph/DiscussionsGraph";

export interface Comment {
  id: number;
  viewerName: string;
  content: string;
  icon?: string;
  likes?: number;
}

export interface Discussion {
  id: number;
  viewerName: string;
  icon?: string;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
}

const CommunityPage = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("");
  const [newDiscussionContent, setNewDiscussionContent] = useState("");
  const [userData, setUserData] = useState<{ username: string } | null>(null);
  const [profileImage, setProfileImage] = useState<string>(
    " /images/SignIn/ProfileImage.png"
  );
  const [discussionPopUp, setDiscussionPopUp] = useState(false);
  const [formError, setFormError] = useState(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [discussionRating, setDiscussionRating] = useState<{
    [key: number]: { liked: boolean; disliked: boolean };
  }>({});
  const navigate = useNavigate();

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

  const fetchDiscussions = async () => {
    try {
      const response = await axios.get("http://localhost:5001/discussions");
      setDiscussions(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStartDiscussion = async () => {
    if (!userData || !profileImage) {
      console.log(
        "No information about user or profile image found in local storage"
      );
      return;
    }

    if (
      newDiscussionTitle.trim() === "" ||
      newDiscussionContent.trim() === ""
    ) {
      setFormError(true);
      return;
    }

    const newDiscussionObject: Discussion = {
      id: Math.floor(Math.random() * 1000),
      viewerName: userData.username,
      title: newDiscussionTitle,
      content: newDiscussionContent,
      likes: 0,
      dislikes: 0,
      comments: [],
    };

    try {
      await axios.post(
        "http://localhost:5001/discussions",
        newDiscussionObject
      );
      fetchDiscussions();
      setNewDiscussionTitle("");
      setNewDiscussionContent("");
      setFormError(false);
      setDiscussionPopUp(false);
    } catch (error) {
      console.error("Error creating new discussion:", error);
    }
  };

  const filteredDiscussions = discussions.filter((discussion) =>
    discussion.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goToDiscussion = (id: number) => {
    navigate(`/comment/${id}`);
  };

  const openDiscussionPopUp = () => {
    setDiscussionPopUp(true);
  };

  const closeDiscussionPopUp = () => {
    setDiscussionPopUp(false);
    setFormError(false);
  };

  const toggleShowMore = () => {
    setShowMore(true);
  };

  const handleRating = async (
    discussionId: number,
    type: "like" | "dislike"
  ) => {
    const discussion = discussions.find((d) => d.id === discussionId);
    if (!discussion) return;

    const userInteraction = discussionRating[discussionId] || {
      liked: false,
      disliked: false,
    };
    const newInteractions = { ...userInteraction };
    let updatedDiscussion = { ...discussion };

    if (type === "like") {
      if (userInteraction.liked) return;
      newInteractions.liked = true;
      newInteractions.disliked = false;
      updatedDiscussion.likes += 1;
      if (userInteraction.disliked) {
        updatedDiscussion.dislikes -= 1;
      }
    } else {
      if (userInteraction.disliked) return;
      newInteractions.liked = false;
      newInteractions.disliked = true;
      updatedDiscussion.dislikes += 1;
      if (userInteraction.liked) {
        updatedDiscussion.likes -= 1;
      }
    }

    try {
      await axios.patch(`http://localhost:5001/discussions/${discussionId}`, {
        likes: updatedDiscussion.likes,
        dislikes: updatedDiscussion.dislikes,
      });

      setDiscussions(
        discussions.map((d) => (d.id === discussionId ? updatedDiscussion : d))
      );

      setDiscussionRating({
        ...discussionRating,
        [discussionId]: newInteractions,
      });
    } catch (error) {
      console.error(`Error updating ${type}s:`, error);
    }
  };

  return (
    <div className="community-container">
      <Navigation />
      <div className="community-inner">
        <div className="left-side">
          <h1 className="community-h1">Community</h1>
          <div className="search-bar">
            <div>
              <img
                src="/images/Community/Icons/icon1.png"
                alt="settings icon"
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <button onClick={openDiscussionPopUp}>Start a discussion</button>
          </div>
          <div className="discussion-list">
            <div className="d-flex justify-content-between mx-3">
              <p>Posts</p>
              <p>Rating</p>
            </div>
            {filteredDiscussions && filteredDiscussions.length > 0 ? (
              <>
                {(showMore
                  ? filteredDiscussions
                  : filteredDiscussions.slice(0, 5)
                ).map((discussion) => (
                  <div key={discussion.id} className="discussion-item">
                    <div
                      className="d-flex align-items-center"
                      onClick={() => goToDiscussion(discussion.id)}
                    >
                      <img
                        src={
                          discussion.viewerName === userData?.username
                            ? profileImage || "/images/default-profile.png"
                            : discussion.icon || "/images/default-profile.png"
                        }
                        alt="profile icon"
                      />
                      <h4>{discussion.title}</h4>
                    </div>
                    <div className="like-dislike-buttons">
                      <div>
                        <img
                          src="/images/Community/Icons/icon2.png"
                          alt="like icon"
                          onClick={() => handleRating(discussion.id, "like")}
                        />
                        <span className="pe-4">{discussion.likes}</span>
                      </div>

                      <div>
                        <img
                          src="/images/Community/Icons/icon3.png"
                          alt="dislike icon"
                          className="me-0"
                          onClick={() => handleRating(discussion.id, "dislike")}
                        />
                        <span>{discussion.dislikes}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {!showMore && filteredDiscussions.length > 5 && (
                  <div className="d-flex justify-content-center">
                    <button onClick={toggleShowMore} className="my-5">
                      Show More
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p>No discussions found.</p>
            )}
          </div>
          {discussionPopUp && (
            <>
              <div
                className="pop-up-overlay"
                onClick={closeDiscussionPopUp}
              ></div>
              <div className="discussion-pop-up">
                <div className="pop-up-inner">
                  <img
                    className="close-icon"
                    src="./images/HomePage/Icons/icon17.png"
                    alt="icon"
                    onClick={closeDiscussionPopUp}
                  />
                  <input
                    type="text"
                    placeholder="Title..."
                    value={newDiscussionTitle}
                    onChange={(e) => setNewDiscussionTitle(e.target.value)}
                  />
                  <textarea
                    placeholder="Discussion content..."
                    value={newDiscussionContent}
                    maxLength={500}
                    onChange={(e) => setNewDiscussionContent(e.target.value)}
                  />
                  {formError && (
                    <p className="error-message">Please fill in both fields!</p>
                  )}
                  <button onClick={handleStartDiscussion}>
                    Post Discussion
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="right-side">
          <div className="d-flex align-items-center">
            <DiscussionsGraph
              discussions={discussions}
              type="comment"
              max={20}
            />
            <p className="m-0 ms-3">Comments</p>
          </div>
          <div className="d-flex align-items-center">
            <DiscussionsGraph
              discussions={discussions}
              type="discussion"
              max={20}
            />
            <p className="m-0 ms-3">Discussions</p>
          </div>

          <p className="latest-p mb-1">Latest comments:</p>
          <div className="latest-comment">
            <div>
              <img
                src="/images/Community/Users/image3.png"
                alt="profile icon"
              />
              <p>Симе:</p>
            </div>
            <p className="latest-p">Колку добра сцена...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
