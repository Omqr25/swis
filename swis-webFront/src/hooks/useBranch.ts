import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Branches from "../entities/Branches";
import Response from "../entities/GlobalResponse";
import APIClient from "../services/APIClient";
interface CustomError extends Error {
    response?: {
      status: number;
    };
  }
  const useBranche = (id : number) =>{
    const apiClient = new APIClient<Response<Branches>>(`/branches`);
    const navigate = useNavigate();
   
    return useQuery({
        queryKey: ["branche" , id],
        queryFn: () => apiClient.get(id),
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
export default useBranche;