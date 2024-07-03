import { GetAllResponse } from "../entities/GlobalResponse";
import Wearhouse from "../entities/wearhouse";
import APIClient, { setAuthToken } from "../services/APIClient";

const apiClient = new APIClient<GetAllResponse<Wearhouse>>('/wearhouses/all');
const useWearhouses = () =>{
    setAuthToken();
    return apiClient.getAll;
}
export default useWearhouses;