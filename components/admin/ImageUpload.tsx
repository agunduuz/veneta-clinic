// components/admin/ImageUpload.tsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploadProps {
  currentImage?: string;
  onUploadComplete: (url: string) => void;
  label?: string;
}

export default function ImageUpload({
  currentImage,
  onUploadComplete,
  label = "Görsel",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Lütfen sadece resim dosyası yükleyin!");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Dosya boyutu 5MB'dan küçük olmalı!");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onUploadComplete(data.url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Yükleme başarısız oldu!");
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
    }
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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative border-2 border-dashed rounded-lg p-6 transition-all cursor-pointer ${
          dragActive
            ? "border-[#b2d6a1] bg-[#f0f9ed]"
            : "border-gray-300 hover:border-[#b2d6a1]"
        } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileChange(e.target.files[0]);
            }
          }}
          className="hidden"
        />

        {preview ? (
          <div className="space-y-3">
            {/* Image Preview */}
            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>

            {/* Change Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                className="text-sm text-[#68947c] hover:text-[#b2d6a1] font-medium"
              >
                {uploading ? "Yükleniyor..." : "Görseli Değiştir"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-2">
            {/* Upload Icon */}
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="text-sm text-gray-600">
              <span className="font-medium text-[#68947c]">
                Yüklemek için tıklayın
              </span>{" "}
              veya sürükleyip bırakın
            </div>

            <p className="text-xs text-gray-500">PNG, JPG, GIF (max. 5MB)</p>
          </div>
        )}

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
    </div>
  );
}
