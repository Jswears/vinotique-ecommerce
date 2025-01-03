interface SubmitButtonProps {
    isLoading: boolean;
}

export default function SubmitButton({ isLoading }: SubmitButtonProps) {
    return (
        <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${isLoading ? "cursor-not-allowed" : ""}`}
            disabled={isLoading}
        >
            {isLoading ? "Uploading" : "Upload Wine"}
        </button>
    );
}
