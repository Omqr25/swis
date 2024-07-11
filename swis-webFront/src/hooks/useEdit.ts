import { useMutation } from "@tanstack/react-query";
import Response from "../entities/GlobalResponse";
import APIClient, { setAuthToken } from "../services/APIClient";

const useEdit = <T, D>(id: number, endPoint: string) => {
  const apiClient = new APIClient<Response<T>>(`/${endPoint}/${id}`);
  setAuthToken();
  return useMutation<Response<T>, Error, D>({
    mutationKey: [`edit${endPoint}`, id],
    mutationFn: (branch) => apiClient.post<D>(branch),
    onError(error) {
      error.message;
    },
  });
};
export default useEdit;
