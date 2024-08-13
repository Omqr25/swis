import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { GetAllResponse } from "../entities/GlobalResponse";
import Search from "../entities/Search";
import APIClient, { setAuthToken } from "../services/APIClient";
interface CustomError extends Error {
  response?: {
    status: number;
  };
}

const useSearch = <T>(
  endPoint: string,
  searchData: string,
 
) => {
  const navigate = useNavigate();
  const apiClient = new APIClient<GetAllResponse<Search<T>>>(`/${endPoint}`);
  setAuthToken();
  return useQuery({
    queryKey: [`search${endPoint}`, searchData],
    queryFn: () => apiClient.get({params:{
      query : searchData
    }}),
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

export default useSearch;
