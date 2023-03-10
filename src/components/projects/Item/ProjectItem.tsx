import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectResponse from "@/models/projects";
import DrowDownMenu from "../Menu/DrowDownMenu";
import useDeleteProjectMutation from "@/hooks/mutation/project/useDeleteProjectMutation";
import UpdateItem from "../edit/UpdateItem";

interface IProps {
  project: ProjectResponse;
}

const ProjectItem = ({ project }: IProps) => {
  const { id, name, description, link, imageName } = project;
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [updateTargetId, setUpdateTargetId] = useState<number | null>(null);
  const mutatation = useDeleteProjectMutation();

  const onRemoveProject = (projectId?: number) => {
    if (projectId && window.confirm("정말 삭제하시겠습니까?")) {
      mutatation.mutate(projectId);
    }
  };

  const onEditTarget = (id: number) => {
    setIsEditMode(true);
    setUpdateTargetId((prev) => (prev = id));
  };

  const projectObj = { updateTargetId, id, name, description, link, imageName };
  return (
    <div key={id} className="p-item relative py-12 px-8 w-full bg-white shadow-lg rounded-lg">
      <div className="p-[1.25rem]">
        <div className="absolute top-4 right-2">
          {!isEditMode && (
            <DrowDownMenu
              key={id}
              id={id}
              onRemoveProject={onRemoveProject}
              onEditTarget={onEditTarget}
            />
          )}
        </div>
        {isEditMode && id === updateTargetId ? (
          <UpdateItem project={projectObj} setIsEditMode={setIsEditMode} />
        ) : (
          <div className="flex-col gap-[13px]">
            <div className="w-full">
            <div className="w-[70%] m-auto">
                <img className="w-full h-[480px]" src={`http://pfmback-env-1.eba-cmbywf2u.ap-northeast-2.elasticbeanstalk.com/img/${imageName}`} alt="project-img" />
            </div>
            <div className="pt-12">
              <div className="py-2">
                <span className="text-3xl font-bold">{name}</span>
              </div>
              <div className="py-2">
                <div className="pb-3">
                  <span className="text-[20px] font-semibold">설명</span>
                </div>
                <span className="text-[20px] break-words">{description}</span>
              </div>
              <div className="py-2">
                <div className="pb-3">
                  <span className="text-[20px] font-semibold">관련 링크</span>
                </div>
                <Link to={link} target="_blank">
                  <span className="text-[20px] break-words">{link}</span>
                </Link>
              </div>
            </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectItem;
