import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/Home/HomePage";
import MoviesRoomPage from "../../pages/MoviesRoom/MoviesRoomPage";
import SearchPage from "../../pages/Search/SearchPage";
import CommunityPage from "../../pages/Community/CommunityPage";
import CommentPage from "../../pages/Comment/CommentPage";
import WatchPage from "../../pages/Watch/WatchPage";
import ProfilePage from "../../pages/Profile/ProfilePage";

export const AuthorizedRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/movies"} element={<MoviesRoomPage />} />
      <Route path={"/search"} element={<SearchPage />} />
      <Route path={"/community"} element={<CommunityPage />} />
      <Route path={"/comment/:id"} element={<CommentPage />} />
      <Route path={"/watch/:id"} element={<WatchPage />} />
      <Route path={"/profile"} element={<ProfilePage />} />

      <Route path={"*"} element={<Navigate to="/" />} />
    </Routes>
  );
};
