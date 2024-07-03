import { useMutation } from "@tanstack/react-query";
import Branches from "../entities/Branches";
import Response from "../entities/GlobalResponse";
import APIClient, { setAuthToken } from "../services/APIClient";
import Branches2 from "../entities/Branches2";

const useEditBranch = (id : number) => {
    const apiClient = new APIClient<Response<Branches>>(`/branches/${id}`);
    setAuthToken();
     return useMutation<Response<Branches> , Error , Branches2>({
      mutationKey: ['editbranch' , id],
      mutationFn: (branch) => apiClient.post<Branches2>(branch),
      onError(error) {
        error.message;
      },
     })
};
export default useEditBranch;