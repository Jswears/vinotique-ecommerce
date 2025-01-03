'use client';
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";



export default function Account() {

    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

    const getPresignedUrl = async (fileName: string) => {
        if (!fileName) {
            console.error("File name not set");
        }
        try {
            const response = await axios.post('https://8g9lxiz7d3.execute-api.eu-central-1.amazonaws.com/dev/getPresignedUrl', {
                fileName
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            const data = response.data;
            return data;
        } catch (error) {
            console.error("Error getting presigned URL: ", error);
        }

    }

    const uploadImage = async (file: File, presignedUrl: string) => {

        if (!presignedUrl) {
            console.error("Presigned URL not set");
            return;
        }
        try {
            const response = await axios.put(presignedUrl, file, {
                headers: {
                    'Content-Type': file.type,
                }
            });
            console.log("File uploaded successfully: ", response);

        } catch (error) {
            console.error("Error uploading image: ", error);

        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const wineFormData = new FormData(e.target as HTMLFormElement);
        const file = wineFormData.get('image') as File;
        const fileName = file?.name;
        console.log("File: ", file);
        console.log("File name: ", fileName);
        if (!fileName) {
            console.error("File not selected")
            return;
        }

        try {
            console.log("Getting presigned URL");
            const presignedUrl = await getPresignedUrl(fileName);
            const uploadUrl = presignedUrl.uploadUrl;

            if (!presignedUrl) {
                console.error("Presigned URL not set");
                return;
            }

            await uploadImage(file, uploadUrl);




            // console.log("File uploaded successfully: ", response);

            // const publicUrl = `https://${bucketName}.s3.amazonaws.com/${fileKey}`;
            // console.log("Public URL: ", publicUrl);

            // const wineResponse = await axios.post('https://vg9ltguuwc.execute-api.eu-central-1.amazonaws.com/default/addWineProduct', {
            //     name: wineFormData.get('name'),
            //     country: wineFormData.get('country'),
            //     image: publicUrl
            // },
            // );
            // console.log(wineResponse);
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
    };


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


            <form onSubmit={handleSubmit} action="buildObject" className="w-14 h-14 flex items-center gap-4">
                <label htmlFor="name">
                    Name:
                    <input type="text" name="name" id="name" />
                </label>
                <label htmlFor="country">
                    Country:
                    <input type="text" name="country" id="country" />
                </label>
                <label htmlFor="image">
                    <input type="file" name="image" id="image" />
                </label>
                <button className="bg-white text-black hover:bg-blue-300 rounded-lg px-4 py-2 " type="submit">Submit</button>
            </form>

            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Your Account</h1>
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Account Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Personal details and preferences.</p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700">
                    <dl>
                        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full name</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">John Doe</dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email address</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">johndoe@example.com</dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone number</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">+1 (555) 123-4567</dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                                123 Wine St, Grapevine, CA 90210
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}

