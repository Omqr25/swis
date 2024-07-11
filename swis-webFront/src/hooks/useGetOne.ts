import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Response from "../entities/GlobalResponse";
import APIClient, { setAuthToken } from "../services/APIClient";
interface CustomError extends Error {
  response?: {
    status: number;
  };
}
const useGetOne = <T>(id: number , endPoint: string) => {
  const apiClient = new APIClient<Response<T>>(`/${endPoint}`);
  const navigate = useNavigate();
  setAuthToken();
  return useQuery({
    queryKey: [`one${endPoint}`, id],
    queryFn: () => apiClient.get(id),
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
};
export default useGetOne;
