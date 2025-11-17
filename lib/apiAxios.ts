import clientEnv from "@/utils/clientEnv";
import axios from "axios";

const apiAxios = axios.create({
  baseURL: clientEnv.NEXT_PUBLIC_API_URL,
  validateStatus: (_) => true,
  withCredentials: true,
});

export function axiosFetcher(endpoint: string) {
  return apiAxios.get(endpoint).then((res) => res.data);
}

export default apiAxios;
