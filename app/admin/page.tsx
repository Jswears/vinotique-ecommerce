'use client';
import { useWineForm } from "@/hooks/useWineForm";
import FormInput from "../components/AdminUpload/FormInput";
import FormSelect from "../components/AdminUpload/FormSelect";
import ImagePreview from "../components/AdminUpload/ImagePreview";
import SubmitButton from "../components/AdminUpload/SubmitButton";
import { ToastContainer } from "react-toastify";

export default function AdminPanel() {
    const { formData, previewUrl, isLoading, handleChange, handleSubmit } = useWineForm();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Admin Panel - Upload Wine</h1>
            <form onSubmit={e => { e.preventDefault(); handleSubmit(); }} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <FormInput label="Name" type="text" name="name" value={formData.name} onChange={handleChange} />
                <FormInput label="Country" type="text" name="country" value={formData.country} onChange={handleChange} />
                <FormInput label="Bottle Size" type="text" name="bottle" value={formData.bottle} onChange={handleChange} />
                <FormInput label="Producer" type="text" name="producer" value={formData.producer} onChange={handleChange} />
                <FormInput label="Vintage" type="text" name="vintage" value={formData.vintage} onChange={handleChange} />
                <FormInput label="Image" type="file" name="image" value="" onChange={handleChange} />
                <ImagePreview previewUrl={previewUrl} />
                <FormSelect
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    options={[
                        { value: 'red', label: 'Red' },
                        { value: 'white', label: 'White' },
                        { value: 'sparkling', label: 'Sparkling' },
                        { value: 'rose', label: 'Rosé' },
                    ]}
                />
                <SubmitButton isLoading={isLoading} />
            </form>
        </div>
    );
}
