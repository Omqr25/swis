import { useMutation } from "@tanstack/react-query";
import Branches from "../entities/Branches";
import Branches2 from "../entities/Branches2";
import Response from "../entities/GlobalResponse";
import APIClient from "../services/APIClient";

const useCreateBranch = () => {
    const apiClient = new APIClient<Response<Branches>>(`/branches`);
    
     return useMutation<Response<Branches> , Error , Branches2>({
      mutationKey: ['createbranch'],
      mutationFn: (branch) => apiClient.post<Branches2>(branch),
      onError(error) {
        error.message;
      },
     })
};
export default useCreateBranch;