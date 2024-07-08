import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Branches from "../entities/Branches";
import { GetAllResponse } from "../entities/GlobalResponse";
import APIClient from "../services/APIClient";
interface CustomError extends Error {
    response?: {
      status: number;
    };
  }
  const useSubBranches = (id : number | undefined) =>{
    const apiClient = new APIClient<GetAllResponse<Branches>>(`/branches/indexSubBranch/${id}`);
    const navigate = useNavigate();
     const { data, error, isLoading } = useQuery({
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
      return { data, error, isLoading };
};
export default useSubBranches;