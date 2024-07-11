import { useMutation } from "@tanstack/react-query";
import Response from "../entities/GlobalResponse";
import APIClient, { setAuthToken } from "../services/APIClient";

const useCreate = <T, D>(endPoint: string) => {
  const apiClient = new APIClient<Response<T>>(`/${endPoint}`);
  setAuthToken();
  return useMutation<Response<T>, Error, D>({
    mutationKey: [`create${endPoint}`],
    mutationFn: (branch) => apiClient.post<D>(branch),
    onError(error) {
      error.message;
    },
  });
};
export default useCreate;
