import { useQuery } from "@tanstack/react-query";
import { GetAllResponse } from "../entities/GlobalResponse";
import APIClient, { setAuthToken } from "../services/APIClient";
import { useNavigate } from "react-router-dom";
interface CustomError extends Error {
  response?: {
    status: number;
  };
}
const useGetHome = <T>(endPoint: string) => {
  const apiClient = new APIClient<GetAllResponse<T>>(`/${endPoint}`);
  const navigate = useNavigate();

  const today = new Date();
  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayFormatted = formatDate(today);
  const monthAgoFormatted = formatDate(monthAgo);
  console.log("Today:", todayFormatted);
  console.log("Month Ago:", monthAgoFormatted);
  setAuthToken();
  return useQuery({
    queryKey: [`getall${endPoint}`],
    queryFn: () =>
      apiClient.get({
        params: {
          start_date: monthAgoFormatted,
          end_date: "2024-08-17",
        },
      }),
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
export default useGetHome;
