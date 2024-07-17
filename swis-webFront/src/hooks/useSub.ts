import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { GetAllResponse } from "../entities/GlobalResponse";
import APIClient, { setAuthToken } from "../services/APIClient";
interface CustomError extends Error {
  response?: {
    status: number;
  };
}
const useSub = <T>(id: number | undefined, endpoint: string) => {
  const apiClient = new APIClient<GetAllResponse<T>>(
    `/${endpoint}/${id}`
  );
  const navigate = useNavigate();
  setAuthToken();
  const { data, error, isLoading } = useQuery<GetAllResponse<T> , CustomError>({
    queryKey: [endpoint, id],
    queryFn: apiClient.getAll,
    onError: (err: CustomError) => {
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
    },
  });
  return { data, error, isLoading };
};
export default useSub;
