import HomePage from "@/pages/home";
import WritePage from "@/pages/write";
import MyInfoPage from "@/pages/myinfo";
import Path from "@/utils/path/routes";
import { Navigate, Route, Routes } from "react-router-dom";
import ResumePage from "@/pages/resume";
import BoardPage from "@/pages/board";
import BoardEdit from "@/pages/boardEdit";
const ProtectedRoutes = () => {
  const {
    HOME,
    LOGIN,
    SIGNUP,
    WRITE,
    MYINFO,
    RESUME,
    BOARD,
    BOARD_NEW,
    BOARD_UPDATE,
  } = Path;

  return (
    // 로그인 되었을떄 보이는 페이지
    <Routes>
      <Route path={HOME} element={<HomePage />} />
      <Route path={MYINFO} element={<MyInfoPage />} />
      <Route path={WRITE} element={<WritePage />} />
      <Route path={BOARD} element={<BoardPage />} />
      <Route path={`${BOARD}/:id`} element={<BoardPage />} />
      <Route path={BOARD_NEW} element={<BoardEdit />} />
      <Route path={BOARD_UPDATE} element={<BoardEdit />} />
      {/* Resume CRUD */}
      <Route path={RESUME} element={<ResumePage />} />
      {/*  */}
      <Route path={HOME} element={<HomePage />} />
      <Route path="*" element={<Navigate replace to={HOME} />} />
    </Routes>
  );
};

export default ProtectedRoutes;
