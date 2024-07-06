import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/APIClient";

interface Response{
 message : string;
 status : string;
}
const useDelete = (id : number , target : string) => {
    const apiClient = new APIClient<Response>(`/${target}/${id}`);
   
     return useMutation<any , Error , any>({
      mutationKey: [`delete${target}` , id],
      mutationFn: (branch) => apiClient.post(branch),
      onSuccess : (vlaues , variables) => {
        console.log(vlaues , variables);
      },
      
     })
};
export default useDelete;