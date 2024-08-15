import { useMutation } from "@tanstack/react-query";
import APIClient, { setAuthToken } from "../services/APIClient";
import { ReportRequest } from "../entities/Reports";

const useDownLoad = () => {
  const apiClient = new APIClient<ReportRequest>("files/downloader");
  setAuthToken();
  return useMutation<ReportRequest,Error,ReportRequest>({
    mutationKey: ["files/downloader"],
    mutationFn: (data) => {console.log(data);return apiClient.download<ReportRequest>(data , {responseType : "blob"})},
    onError: (error) => {
     console.log("Download Error: " , error.message);
    },
    onSuccess : (vlaues , variables) => {
      console.log(vlaues , variables);
    const link = document.createElement('a');
    link.href = variables.url;
    link.setAttribute('download', 'filename.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    },
    
  });
};
export default useDownLoad;
