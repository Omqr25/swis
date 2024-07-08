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

const useBranches = () => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ["branches"],
    queryFn: apiClient.getAll,
    onError: (err: CustomError) => {
      if (err.response) {
        const statusCode = err.response.status;
        if (statusCode === 401) {
          navigate("/login");
        }
      }
    }
  });

  return { data, error, isLoading };
};

export default useBranches;
