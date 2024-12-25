import React, { useState } from "react";
import { Upload } from "lucide-react";
import { analyzeECG } from "../../services/ecgService";
import { saveECGRecord } from "../../db/database";

interface ECGUploadProps {
  onUploadComplete: () => void;
}

export default function ECGUpload({ onUploadComplete }: ECGUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const record = await analyzeECG(file);
      await saveECGRecord(record);
      onUploadComplete();
    } catch (err) {
      setError("Failed to process ECG image. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
      // Reset the file input to allow re-upload of the same file
      e.target.value = "";
    }
  };

  return (
    <div className="mt-4">
      <label className="block w-full">
        <div
          className={`
            flex items-center justify-center w-full h-32 px-4 
            transition bg-white border-2 border-gray-300 border-dashed rounded-lg 
            appearance-none cursor-pointer hover:border-blue-500 focus:outline-none
            ${uploading ? "opacity-50" : ""}
          `}
        >
          <div className="flex flex-col items-center space-y-2">
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-500">
              {uploading ? "Processing..." : "Click to upload ECG image"}
            </span>
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
        />
      </label>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
