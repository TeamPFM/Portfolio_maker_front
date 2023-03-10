import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import H1 from "@/styles/ui-components/H1";
import Path from "@/utils/path/routes";
import token from "@/libs/token";

const GNB = () => {
  const navigate = useNavigate();

  const { HOME, LOGIN, MYINFO, BOARD } = Path;
  const [isToggleMenu, setIsToggleMenu] = useState<Boolean>(false);

  const authToken = token.getToken("token");

  const toggleMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.3,
      },
      display: "flex",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.3,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <>
      {isToggleMenu && (
        <article
          className="fixed w-full right0 left-0 bottom-0 bg-black bg-opacity-20 top-20 z-10"
          onClick={() => {
            setIsToggleMenu(false);
          }}
        ></article>
      )}

      <div className="fixed left-0 top-0 w-full h-20 flex align-middle justify-between px-5 drop-shadow z-10 bg-white border-b-2">
        <H1 className="logo">
          <Link
            to={HOME}
            onClick={() => {
              setIsToggleMenu(false);
            }}
          >
            Portfolio Maker
          </Link>
        </H1>

        <nav>
          <ul className="flex space-x-4 items-center h-full">
            <li>
              <Link
                to={BOARD}
                className="hover:text-main transition-all"
                onClick={() => {
                  setIsToggleMenu(false);
                }}
              >
                게시판
              </Link>
            </li>
            <li className="relative">
              <button
                className="flex justify-center items-center rounded-full bg-main border-2 border-main opacity-70 hover:opacity-100 transition-all"
                onClick={() => {
                  !authToken
                    ? navigate(LOGIN, { replace: true })
                    : setIsToggleMenu(!isToggleMenu);
                }}
              >
                <FaUserCircle className="text-3xl text-white" />
              </button>

              <motion.div
                className={`flex flex-col absolute top-[100%] right-[35px] w-[120px] bg-indigo-100 text-gray-500 rounded-lg rounded-tr-none overflow-hidden transition-all`}
                initial="exit"
                animate={isToggleMenu ? "enter" : "exit"}
                variants={toggleMenuAnimate}
              >
                <div
                  className="px-3 py-2 border-b-[1px] border-white hover:text-white hover:bg-main transition-all"
                  onClick={() => {
                    navigate(MYINFO, { replace: true });
                    setIsToggleMenu(!isToggleMenu);
                  }}
                >
                  내 정보
                </div>
                <div
                  className="px-3 py-2 hover:text-white hover:bg-main transition-all"
                  onClick={() => {
                    navigate(LOGIN, { replace: true });
                    setIsToggleMenu(!isToggleMenu);
                    token.removeToken("token");
                  }}
                >
                  로그아웃
                </div>
              </motion.div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default GNB;
