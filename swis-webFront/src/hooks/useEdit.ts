import { useMutation, useQueryClient } from "@tanstack/react-query";
import Response from "../entities/GlobalResponse";
import APIClient, { setAuthToken } from "../services/APIClient";

const useEdit = <T, D>(id: number, endPoint: string , target2? : string) => {
  const apiClient = new APIClient<Response<T>>(`/${endPoint}/${id}`);
  const queryClient = useQueryClient();
  setAuthToken();
  return useMutation<Response<T>, Error, D>({
    mutationKey: [`edit${endPoint}`, id],
    mutationFn: (branch) => apiClient.post<D>(branch),
    onError(error) {
      error.message;
    },
    onSuccess : (vlaues , variables) => {
      console.log(vlaues , variables);
      if(endPoint === 'users'){
        queryClient.invalidateQueries([target2]);
        }else queryClient.invalidateQueries([endPoint]);
    },
  });
};
export default useEdit;
