import { useMutation, useQueryClient } from "@tanstack/react-query";
import Response from "../entities/GlobalResponse";
import APIClient, { setAuthToken } from "../services/APIClient";

const useCreate = <T, D>(endPoint: string , target2? : string) => {
  const apiClient = new APIClient<Response<T>>(`/${endPoint}`);
  const queryClient = useQueryClient();
  setAuthToken();
  return useMutation<Response<T>, Error, D>({
    mutationKey: [`create${endPoint}`],
    mutationFn: (data) => apiClient.post<D>(data),
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
export default useCreate;
