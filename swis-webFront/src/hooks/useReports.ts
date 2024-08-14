import { useQuery } from "@tanstack/react-query";
import Report from "../entities/Reports"
import APIClient, { setAuthToken } from "../services/APIClient"
import { useNavigate } from "react-router-dom";
interface CustomError extends Error {
    response?: {
      status: number;
    };
  }
const useReports = () => {
    const apiClient = new APIClient<Report[]>('files');
    setAuthToken();
    const navigate = useNavigate();
    return useQuery({
        queryKey: ['files'],
        queryFn : apiClient.getAll,
        onError: (err: CustomError) => {
            console.error("Error fetching branches:", err);
            if (err.response) {
              const statusCode = err.response.status;
              console.log("Status code:", statusCode);
              if (statusCode === 401) {
                navigate("/login");
              }
            }
          },
    });
};
export default useReports;