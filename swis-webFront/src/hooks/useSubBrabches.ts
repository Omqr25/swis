import { useQuery } from "@tanstack/react-query"
import { GetAllResponse } from "../entities/GlobalResponse";
import Branches from "../entities/Branches";
import APIClient, { setAuthToken } from "../services/APIClient";
import { useNavigate } from "react-router-dom";
interface CustomError extends Error {
    response?: {
      status: number;
    };
  }
  const useSubBranches = (id : number | undefined) =>{
    const apiClient = new APIClient<GetAllResponse<Branches>>(`/branches/indexSubBranch/${id}`);
    const navigate = useNavigate();
    setAuthToken();
    return useQuery({
        queryKey: ["subbranches" , id],
        queryFn: apiClient.getAll,
        onError: (err : CustomError) => {
            console.error("Error fetching branches:", err);

      // Check if the error has a response object
      if (err.response) {
        const statusCode = err.response.status;
        console.log("Status code:", statusCode);
        if (statusCode === 401) {
          // Unauthorized
          navigate("/login");
        } 
        }
      }});
}
export default useSubBranches;