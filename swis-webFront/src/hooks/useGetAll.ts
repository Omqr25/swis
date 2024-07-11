import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { GetAllResponse } from "../entities/GlobalResponse";
import APIClient, { setAuthToken } from "../services/APIClient";

interface CustomError extends Error {
  response?: {
    status: number;
  };
}

const useGetAll = <T>(endPoint : string) => {
  const navigate = useNavigate();
  const apiClient = new APIClient<GetAllResponse<T>>(`/${endPoint}`);
  setAuthToken();
 return useInfiniteQuery<GetAllResponse<T> , CustomError>({
    queryKey: [endPoint],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
      params:{
        page : pageParam
      }
    }),
    getNextPageParam : (lastPage , allPages) =>{
    return lastPage.meta.links.next ? allPages.length + 1 : undefined;
    },
    onError: (err: CustomError) => {
      if (err.response) {
        const statusCode = err.response.status;
        if (statusCode === 401) {
          navigate("/login");
        }
      }
    },
  });

 
};

export default useGetAll;
