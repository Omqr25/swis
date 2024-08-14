import { useQuery } from "@tanstack/react-query";
import { ReportResponse } from "../entities/Reports"
import APIClient, { setAuthToken } from "../services/APIClient"

const useExport = (endpoint : string) => {
    const apiClient = new APIClient<ReportResponse>(`/${endpoint}`);
    setAuthToken();
    return useQuery({
        queryKey: [`Export${endpoint}`],
        queryFn: apiClient.get,
        onSuccess: () =>{
            window.alert("Report Exported")
        }
    })
};
export default useExport;