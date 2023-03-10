import { DefaultButton } from "@/styles/ui-components/styled-button";
import { MouseEvent, useState } from "react";
import { MdEdit, MdMoreVert, MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

interface IProps {
  id?: number;
  onRemoveProject: (id: number) => void;
  onEditTarget: (id: number) => void;
}

const DrowDownMenu = ({ id, onRemoveProject, onEditTarget }: IProps) => {
  const [isVisible, setVisible] = useState(false);

  const onClickDrowDown = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.target);
    setVisible((prev) => !prev);
  };
  return (
    <>
      <DefaultButton className="bg-white" onClick={onClickDrowDown}>
        <MdMoreVert />
      </DefaultButton>
      {isVisible && (
        <ul className="w-[110px] absolute top-10 left-0 bg-indigo-100 shadow-lg rounded">
          <li className="p-2 active:bg-default-active border-b border-b-slate-50 hover:text-white hover:bg-main transition-all">
            <Link
              to=""
              className="flex justify-center items-center gap-3 text-lg"
              onClick={() => {
                if (id) {
                  console.log({ id });
                  onRemoveProject(id);
                  setVisible((prev) => (prev = false));
                }
              }}
            >
              <span className="text-2xl text-gray-700">
                <MdOutlineDeleteOutline />
              </span>
              <span className="text-base">삭제</span>
            </Link>
          </li>
          <li className="p-2 hover:bg-slate-300 active:bg-default-active">
            <Link
              to=""
              className="flex justify-center items-center gap-3 text-lg"
              onClick={() => {
                if (id) {
                  onEditTarget(id);
                  setVisible((prev) => (prev = false));
                }
              }}
            >
              <span className="text-2xl text-gray-700">
                <MdEdit />
              </span>
              <span className="text-base">수정</span>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default DrowDownMenu;
