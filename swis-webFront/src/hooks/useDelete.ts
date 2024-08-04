import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { setAuthToken } from "../services/APIClient";

interface Response{
 message : string;
 status : string;
}
const useDelete = (id : number , target : string , target2? : string) => {
  const queryClient = useQueryClient();
    const apiClient = new APIClient<Response>(`/${target}/${id}`);
     setAuthToken();
     return useMutation<any , Error , any>({
      mutationKey: [`delete${target}` , id],
      mutationFn: (branch) => apiClient.post(branch),
      onSuccess : (vlaues , variables) => {
        console.log(vlaues , variables);
        if(target === 'users'){
        queryClient.invalidateQueries([target2]);
        }else queryClient.invalidateQueries([target]);
      },
      
     })
};
export default useDelete;