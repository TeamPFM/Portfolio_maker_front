import { useState, useRef, FormEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import useCreateTodoMutation from "@/hooks/mutation/project/useCreateProjectMutation";
import UploadButton from "./base/uploadButton";
import UploadImage from "@/components/projects/uploadImage";
import Path from "@/utils/path/routes";
import { ProjectImageResoponse } from "@/models/projects";

const WriteForm = () => {
  const navigate = useNavigate();
  const [projectImage, setProjectImage] = useState<ProjectImageResoponse>({
    imageName: "",
    imagePath: "",
  });
  const projectNameRef = useRef<HTMLInputElement | null>(null);
  const projectDescRef = useRef<HTMLTextAreaElement | null>(null);
  const projectLinkRef = useRef<HTMLInputElement | null>(null);
  const mutatiton = useCreateTodoMutation();

  const { RESUME } = Path;
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (projectNameRef.current && projectDescRef.current && projectLinkRef.current) {
      const newData = {
        name: projectNameRef.current.value,
        description: projectDescRef.current.value,
        link: projectLinkRef.current.value,
        ...projectImage
      };

      mutatiton.mutate(newData);
      navigate(RESUME, { replace: true });
    }
  };

  return (
    <section className="w-full pb-[7px]">
      <div className="w-auto flex justify-center">
        <div className="max-w-[40rem] py-10 w-7/12">
          <header className="py-3 px-5 w-full bg-gray-800 text-white">
            <span className="text-[20px] font-bold">프로젝트 등록</span>
          </header>
          <div className="py-3 px-5 gap-5 w-full bg-white shadow-lg rounded-b-lg">
            <div className="write-form">
              <form className="flex-col gap-3" onSubmit={onSubmit}>
                <div className="project-info w-full pb-5 gap-3 flex">
                  <div className="flex-1 project-title">
                    <p
                      className={`pb-2 font-bold after:content-['*'] after:ml-1.5 after:text-red-400`}
                    >
                      프로젝트명
                    </p>
                    <input
                      className={`border w-full h-8 rounded-sm py-6 px-4 focus:outline-none focus:border-gray-500`}
                      type="text"
                      name="pname"
                      placeholder="프로젝트명을 입력해주세요."
                      autoComplete="off"
                      ref={projectNameRef}
                      required
                    />
                  </div>
                </div>
                <div className="desc pb-5">
                  <p
                    className={`pb-2 font-bold after:content-['*'] after:ml-1.5 after:text-red-400`}
                  >
                    프로젝트 설명
                  </p>
                  <textarea
                    className={`border w-full h-[200px] resize-none rounded-sm py-3 px-4 focus:outline-none focus:border-gray-500`}
                    name="pdesc"
                    placeholder="프로젝트에 대한 설명을 입력해주세요."
                    ref={projectDescRef}
                    required
                  />
                </div>
                <div>
                  <UploadImage setProjectImage={setProjectImage} />
                </div>
                <div>
                  <p className={`pb-2 font-bold`}>링크</p>
                  <div>
                    <input
                      className="border w-full h-8 rounded-sm py-6 px-4 focus:outline-none focus:border-gray-500"
                      name="link"
                      type="text"
                      ref={projectLinkRef}
                      autoComplete="off"
                      placeholder="링크할 주소를 넣어주세요"
                      title="http, https을 포함해 url를 넣어주세요"
                      pattern="http[s]?://.+"
                    />
                  </div>
                </div>
                <div className="btn-group w-full flex py-5 gap-3">
                  <div className="flex-1">
                    <UploadButton
                      btnType="취소"
                      onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        if (
                          window.confirm(
                            "취소하면 수정하신 내용이 삭제됩니다.\n그래도 취소하실건가요?"
                          )
                        ) {
                          navigate(RESUME, { replace: true });
                        } else {
                          return;
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <UploadButton btnType="저장" type="submit" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WriteForm;
