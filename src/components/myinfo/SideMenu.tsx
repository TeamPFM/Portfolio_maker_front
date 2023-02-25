import Path from "@/utils/routes/Path";
import api from "@/libs/axios/api";
import { FaUserCircle } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { ChangeEvent, useRef, useState } from "react";
import { MyInfoProps } from "@/pages/myinfo";
import {
  UserInfoImageResoponse,
  UserInfoImageUpdateResponse,
} from "@/models/myinfo";

const BeforeBar: string =
  "before:content-['|'] before:text-gray-300 before:text-xs before:pr-2";
const BottomLinkStyle: string = `hover:text-gray-500 transition-all px-1`;

const menuList: Array<string> = ["내 정보", "이력서"];
const bottomMenuList: Array<string> = ["홈", "로그아웃"];

const SideMenu = (props: MyInfoProps) => {
  const { HOME } = Path;

  const profileImageRef = useRef<HTMLInputElement>(null);

  const profileImageUploadHandler = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const target = e.target;
    const file = (target.files as FileList)[0];

    if (file) {
      const formData = new FormData();
      formData.append("img", file);

      await api
        .post<UserInfoImageResoponse>("api/users/img", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          api
            .post<UserInfoImageUpdateResponse>("api/users/img/update", {
              imageName: "",
              imagePath: res.data.url,
            })
            .then((updateRes) => {
              updateRes.data.success
                ? props.setUserInfo((prev) => ({
                    ...prev,
                    imagePath: res.data.url,
                  }))
                : alert("이미지 업로드에 실패하였습니다.");
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    } else {
      console.log("error");
      return;
    }
  };

  return (
    <div className="basis-80 py-20 relative rounded-xl bg-white shadow-lg mr-5">
      <figure className="flex flex-col justify-center items-center relative">
        <div className="relative flex justify-center items-center w-[122px] h-[122px] bg-gray-300 shadow-lg rounded-full p-[1px]">
          {props.userInfo.imagePath ? (
            <div className="h-full w-full rounded-full overflow-hidden flex justify-center items-center bg-black">
              <img
                src={`http://pfmback-env-1.eba-cmbywf2u.ap-northeast-2.elasticbeanstalk.com/img/${props.userInfo.imagePath}`}
                alt={props.userInfo.imageName}
              />
            </div>
          ) : (
            <FaUserCircle className="text-[120px] text-white" />
          )}

          <button className="absolute bottom-[4px] right-[4px] flex justify-center items-center rounded-full w-8 h-8 bg-indigo-300 hover:bg-indigo-400 transition-all border-white border-2">
            <MdModeEditOutline
              className="text-white text-lg"
              onClick={() => {
                if (profileImageRef.current) profileImageRef.current.click();
              }}
            />
            <input
              className="hidden"
              type="file"
              ref={profileImageRef}
              accept=".jpg, .jpeg, .png"
              onChange={profileImageUploadHandler}
            />
          </button>
        </div>

        <figcaption className="flex flex-col items-center justify-cente mt-4">
          <h3 className="text-xl font-bold">{props.userInfo.name}</h3>
          <small className="text-gray-400">{props.userInfo.email}</small>
        </figcaption>
      </figure>

      <ul className="flex flex-col flex-1 mt-20">
        {menuList.map((v, idx) => (
          <li key={idx} className="border-b-[1px]">
            <button
              className={`${
                props.contentType === v && "text-indigo-400"
              } w-full text-left py-3 px-7 text-gray-600 hover:bg-gray-50 transition-all`}
              onClick={() => props.setContentType(v)}
            >
              {v}
            </button>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-4 right-5 text-gray-400 text-sm">
        {bottomMenuList.map((v, idx) => (
          <Link
            key={idx}
            to={HOME}
            className={`${idx && BeforeBar} ${BottomLinkStyle}`}
          >
            {v}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
