import { useState } from "react";
import { addWine, getPresignedUrl, uploadImage } from "../services/apiService";
import { toast } from "react-toastify";

export interface WineFormData {
  name: string;
  country: string;
  image: File | null;
  bottle: string;
  category: "red" | "white" | "sparkling" | "rose";
  producer: string;
  vintage: string;
}

export const useWineForm = () => {
  const [formData, setFormData] = useState<WineFormData>({
    name: "",
    country: "",
    image: null,
    bottle: "",
    category: "red",
    producer: "",
    vintage: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;

      setFormData((prev) => ({ ...prev, [name]: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.image) return;

    try {
      setIsLoading(true);
      const { name } = formData.image;
      const { uploadUrl, bucketName, fileKey } = await getPresignedUrl(name);

      await uploadImage(formData.image, uploadUrl);
      console.log("bucketName: ", bucketName, "fileKey: ", fileKey);

      const publicUrl = `https://${bucketName}.s3.amazonaws.com/${fileKey}`;
      addWine({ ...formData }, publicUrl);
      toast.success("Wine uploaded successfully");
    } catch (error) {
      console.error("Error uploading wine: ", error);
      toast.error("Error uploading wine");
    } finally {
      setIsLoading(false);
      setFormData({
        name: "",
        country: "",
        image: null,
        bottle: "",
        category: "red",
        producer: "",
        vintage: "",
      });
    }
  };

  return { formData, previewUrl, isLoading, handleChange, handleSubmit };
};
