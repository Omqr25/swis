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
const apiClient = new APIClient<GetAllResponse<Branches>>('/branches');
const useBranches = () =>{
    const navigate = useNavigate();
    
    return useQuery({
        queryKey: ["branches"],
        queryFn: apiClient.getAll,
        onError: (err : CustomError) => {
            console.error("Error fetching branches:", err);

      
      if (err.response) {
        const statusCode = err.response.status;
        console.log("Status code:", statusCode);
        if (statusCode === 401) {
          navigate("/login");
        } else {
          window.alert("Check Your Connection!");
        }
        }
      }});
    }
export default useBranches;