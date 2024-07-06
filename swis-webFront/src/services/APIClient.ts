import axios, { AxiosRequestConfig } from "axios";
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
   Accept: "application/json",
   "Authorization": localStorage.getItem('token')
  }
});
export const setAuthToken = () => {
const token = localStorage.getItem('token');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
};
class APIClient<T> {
  endPoint: string;

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }
  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<T>(this.endPoint, config)
      .then((res) => res.data);
  };
  post = <D>(data: D) => {
    return axiosInstance.post<T>(this.endPoint, data).then((res) => res.data);
  };
  get = (id: number | undefined) => {
    return axiosInstance
      .get<T>(this.endPoint + "/" + id)
      .then((res) => res.data);
  };
}

export default APIClient;

