import { useQuery } from "@tanstack/react-query";
import Branches from "../entities/Branches";
import { GetAllResponse } from "../entities/GlobalResponse";
import APIClient from "../services/APIClient";
import { useNavigate } from "react-router-dom";
interface CustomError extends Error {
    response?: {
      status: number;
    };
  }
const apiClient = new APIClient<GetAllResponse<Branches>>('/branches');
const useBranches = () =>{
    const navigate = useNavigate();
    return useQuery({
        queryKey: ["branches"],
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
export default useBranches;