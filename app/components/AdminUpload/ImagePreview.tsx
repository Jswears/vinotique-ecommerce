import Image from 'next/image';

interface ImagePreviewProps {
    previewUrl: string | null;
}

export default function ImagePreview({ previewUrl }: ImagePreviewProps) {
    if (!previewUrl) return null;

    return (
        <div className="mt-2">
            <Image src={previewUrl} alt="Preview" width={200} height={200} className="rounded-md" />
        </div>
    );
}
