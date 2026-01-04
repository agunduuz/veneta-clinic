"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { X, Upload } from "lucide-react";

interface MultipleImageUploadProps {
  currentImages: string[];
  onImagesChange: (urls: string[]) => void;
  label?: string;
}

export default function MultipleImageUpload({
  currentImages,
  onImagesChange,
  label = "Galeri Görselleri",
}: MultipleImageUploadProps) {
  const [images, setImages] = useState<string[]>(currentImages || []);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (files: FileList) => {
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];

    // Validate files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith("image/")) {
        alert(`${file.name} bir resim dosyası değil!`);
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} 5MB'dan büyük!`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    // Upload files
    setUploading(true);
    const newUrls: string[] = [];

    try {
      for (const file of validFiles) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`${file.name} yüklenemedi`);
        }

        const data = await response.json();
        newUrls.push(data.url);
      }

      const updatedImages = [...images, ...newUrls];
      setImages(updatedImages);
      onImagesChange(updatedImages);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Bazı dosyalar yüklenemedi!");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (urlToRemove: string) => {
    const updatedImages = images.filter((url) => url !== urlToRemove);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer ${
          dragActive
            ? "border-[#b2d6a1] bg-[#f0f9ed]"
            : "border-gray-300 hover:border-[#b2d6a1]"
        } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFileChange(e.target.files);
            }
          }}
          className="hidden"
        />

        <div className="text-center space-y-2">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="text-sm text-gray-600">
            <span className="font-medium text-[#68947c]">
              {uploading ? "Yükleniyor..." : "Resimleri yüklemek için tıklayın"}
            </span>{" "}
            veya sürükleyip bırakın
          </div>
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF (max. 5MB) - Çoklu seçim yapabilirsiniz
          </p>
        </div>

        {/* Loading Overlay */}
        {uploading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b2d6a1] mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">Yükleniyor...</p>
            </div>
          </div>
        )}
      </div>

      {/* Preview Grid */}
      {images.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">
            {images.length} resim yüklendi
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((url, index) => (
              <div key={index} className="relative group">
                <div className="relative w-full h-32 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={url}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(url);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                  title="Sil"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
