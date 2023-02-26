import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import ResumePage from "@/pages/resume";
import SignupPage from "@/pages/signup";
import Path from "@/utils/path/routes";
import { Navigate, Route, Routes } from "react-router-dom";

const UnauthenticatedRoutes = () => {
  const { HOME, LOGIN, SIGNUP, WRITE, MYINFO, RESUME, } = Path;

  return (
    <Routes>
      {/* 비로그인 */}
      <Route path={HOME} element={<HomePage />} />
      <Route path={LOGIN} element={<LoginPage />} />
      <Route path={SIGNUP} element={<SignupPage />} />
      <Route path="*" element={<Navigate replace to={HOME} />} />

      {/* FIXME 로그인 작업편하게 하려고 */}
      <Route path={RESUME} element={<ResumePage />} />
    </Routes>
  );
};

export default UnauthenticatedRoutes;
