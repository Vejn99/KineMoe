import { Navigate, Route, Routes } from "react-router-dom";
import LogInPage from "../../pages/LogIn/LogInPage";
import RegisterPage from "../../pages/Register/RegisterPage";
import LandingPage from "../../pages/Landing/LandingPage";

export const NonAuthorizedRoutes = () => {
  return (
    <Routes>
      <Route path={"/landing"} element={<LandingPage />} />
      <Route path={"/login"} element={<LogInPage />} />
      <Route path={"/register"} element={<RegisterPage />} />
      <Route path={"*"} element={<Navigate to="landing" />} />
    </Routes>
  );
};
