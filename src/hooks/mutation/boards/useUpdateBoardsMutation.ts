import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/libs/axios/api";
import BoardResponse from "@/models/boards";
import API_PATH from "@/utils/path/api";

const { API_UPDATE_BOARD } = API_PATH;
const updateFetch = async ({ postId, ...data }: BoardResponse) => {
  const res = await api.patch<BoardResponse>(`${API_UPDATE_BOARD}/${postId}`, data);
  return res;
};

const useUpdateBoardsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(updateFetch, {
    onError: (error) => {
      return error;
    },
    onSuccess: (data, variables, context) => {
      console.log({ data, variables, context });
      queryClient.invalidateQueries<string>(["board"]);
    },
  });
};

export default useUpdateBoardsMutation;