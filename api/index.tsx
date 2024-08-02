import Constants from "expo-constants";
import { Params, ApiResponse } from "@/constants/types";

const { pixabayApiKey } = Constants.expoConfig?.extra as {
  pixabayApiKey: string;
};

const apiUrl = `https://pixabay.com/api/?key=${pixabayApiKey}`;

const formatUrl = (params?: Params): string => {
  let url = `${apiUrl}&per_page=25&safesearch=true&editors_choice=true`;
  if (!params) return url;
  Object.keys(params).forEach((key) => {
    const value = key === "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });
  return url;
};

export const apiCall = async (
  params: { page?: number } = { page: 1 }
): Promise<ApiResponse> => {
  try {
    const response = await fetch(formatUrl(params));
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error: unknown) {
    console.error("Hubo un error: ", (error as Error).message);
    return { success: false, msg: (error as Error).message };
  }
};
