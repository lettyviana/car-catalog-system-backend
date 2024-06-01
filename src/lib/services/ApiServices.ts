import axios, { AxiosInstance } from "axios";

export class ApiServices {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
      withCredentials: true,
    });
  }

  get(url: string) {
    return this.axios.get(url);
  }

  post(url: string, data: any) {
    return this.axios.post(url, data);
  }

  put(url: string, data: any) {
    return this.axios.put(url, data);
  }

  delete(id: string) {
    return this.axios.delete(id);
  }
}
