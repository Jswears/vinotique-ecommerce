import { WineFormData } from "@/hooks/useWineForm";
import axios from "axios";
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const getPresignedUrl = async (fileName: string) => {
  const response = await axios.post(
    `${BASE_API_URL}/getPresignedUrl`,
    { fileName },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

export const uploadImage = async (file: File, presignedUrl: string) => {
  const response = await axios.put(presignedUrl, file, {
    headers: { "Content-Type": file.type },
  });
};

export const addWine = async (wineData: WineFormData, publicUrl: string) => {
  const response = await axios.post(`${BASE_API_URL}/addWine`, {
    ...wineData,
    image: publicUrl,
  });
  return response.data;
};
