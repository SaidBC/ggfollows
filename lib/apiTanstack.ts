import axios from "axios";
import { isServer } from "@tanstack/react-query";
import clientEnv from "@/utils/clientEnv";

const BASE_URL = clientEnv.NEXT_PUBLIC_API_URL;

export default async function apiTanstack<T>(
  url: string,
  method: "GET" | "POST" = "GET",
  data?: any
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (isServer) {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    const cookieString = cookieStore.toString();
    if (cookieString) {
      headers["Cookie"] = cookieString;
    }
  }

  const config = {
    method,
    url: `${BASE_URL}${url}`,
    data,
    headers,
    withCredentials: true,
  };

  return axios<T>(config).then((res) => res.data);
}
