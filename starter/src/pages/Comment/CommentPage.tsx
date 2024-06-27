import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./comment-page.css";
import { Navigation } from "../../components/Navigation/Navigation";

interface Comment {
  id: number;
  viewerName: string;
  content: string;
  icon?: string;
  likes: number;
}

interface Discussion {
  id: number;
  viewerName: string;
  icon: string;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
}

const CommentPage = () => {
  const { id } = useParams<{ id: string }>();
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [newComment, setNewComment] = useState("");
  const [userData, setUserData] = useState<{ username: string } | null>(null);
  const [profileImage, setProfileImage] = useState<string>(
    " /images/SignIn/ProfileImage.png"
  );

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

  useEffect(() => {
    fetchDiscussion();
  }, [id]);

  const fetchDiscussion = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/discussions/${id}`
      );
      setDiscussion(response.data);
    } catch (error) {
      console.error("Error fetching discussion:", error);
    }
  };

  const handleAddComment = async () => {
    if (!userData || !profileImage) {
      console.log(
        "No information about user or profile image found in local storage"
      );
      return;
    }

    const newCommentObject: Comment = {
      id: Math.floor(Math.random() * 1000),
      viewerName: userData.username,
      content: newComment,

      likes: 0,
    };

    if (discussion) {
      const updatedDiscussion = {
        ...discussion,
        comments: [...discussion.comments, newCommentObject],
      };

      try {
        await axios.put(
          `http://localhost:5001/discussions/${id}`,
          updatedDiscussion
        );
        setDiscussion(updatedDiscussion);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleCommentLike = async (commentId: number) => {
    if (!discussion) return;

    const updatedComments = discussion.comments.map((comment) => {
      if (comment.id === commentId) {
        const newLikesCount = comment.likes === 0 ? 1 : comment.likes + 1;

        return { ...comment, likes: newLikesCount };
      }
      return comment;
    });

    const updatedDiscussion = { ...discussion, comments: updatedComments };
    setDiscussion(updatedDiscussion);

    try {
      await axios.put(
        `http://localhost:5001/discussions/${id}`,
        updatedDiscussion
      );
    } catch (error) {
      console.error("Error updating discussion:", error);
    }
  };

  if (!discussion) return <div>Loading...</div>;

  return (
    <div className="comment-container">
      <Navigation />
      <div className="comment-inner">
        <div className="left-side">
          <h1 className="community-h1">Community/Post</h1>
          <p className="main-comment ms-3">Main Comment</p>
          <div className="discussion-header">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex  align-items-center">
                <img
                  src={
                    discussion.viewerName === userData?.username
                      ? profileImage || "/images/default-profile.png"
                      : discussion.icon || "/images/default-profile.png"
                  }
                  alt="icon"
                />
                <h2>{discussion.title}</h2>
              </div>
              <div className="like-dislike-buttons ">
                <div>
                  <img
                    src="/images/Community/Icons/icon2.png"
                    alt="like icon"
                  />
                  <span className="pe-4">{discussion.likes}</span>
                </div>
                <div>
                  <img
                    src="/images/Community/Icons/icon3.png"
                    alt="dislike icon"
                    className="me-0"
                  />
                  <span>{discussion.dislikes}</span>
                </div>
              </div>
            </div>
            <p className="discussion-content">{discussion.content}</p>
          </div>
          <div className="add-comment mb-3">
            <textarea
              placeholder="Leave a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment} disabled={!newComment.trim()}>
              Post Comment
            </button>
          </div>
          <p className="main-comment ms-3">Comment Section</p>
          <div className="comments-section">
            {discussion.comments.map((comment) => (
              <div key={comment.id} className="comment-item ">
                <div className="d-flex">
                  <img
                    src={
                      comment.viewerName === userData?.username
                        ? profileImage
                        : comment.icon
                    }
                    alt="icon"
                  />
                  <div className="text-dark">
                    <h5 className="m-0">{comment.viewerName}</h5>
                    <p className="m-0">{comment.content}</p>
                  </div>
                </div>
                <div className="like-dislike-buttons">
                  <div>
                    <img
                      className="mt-2"
                      src="/images/Community/Icons/icon4.png"
                      alt="chat icon"
                    />
                  </div>
                  <div>
                    <img
                      className="m-0"
                      src="/images/Community/Icons/icon5.png"
                      alt="like icon"
                      onClick={() => handleCommentLike(comment.id)}
                    />
                    <span className="text-dark pe-1">{comment.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="right-side">
          <p className="latest-p mb-1">Friends in this comment section:</p>
          <div className="latest-comment mb-2">
            <div>
              <img
                className="m-0"
                src="/images/Community/Users/image3.png"
                alt="profile icon"
              />
              <p>Симе</p>
            </div>
            <p className="latest-p">Колку добра сцена...</p>
          </div>
          <div className="latest-comment">
            <div>
              <img
                className="m-0"
                src="/images/Community/Users/image6.png"
                alt="profile icon"
              />
              <p>Јован</p>
            </div>
            <p className="latest-p">Не се сеќавам...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentPage;
