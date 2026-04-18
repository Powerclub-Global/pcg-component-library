"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "../../lib/cn";

export interface ImageUploadProps {
  /** Currently uploaded image URLs */
  value?: string[];
  /** Callback when images change */
  onChange: (urls: string[]) => void;
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Upload endpoint URL */
  uploadUrl?: string;
  /** Accepted MIME types */
  accept?: Record<string, string[]>;
  /** Custom upload handler — if provided, uploadUrl is ignored */
  onUpload?: (files: File[]) => Promise<string[]>;
  /** Label shown in the upload area */
  label?: string;
  className?: string;
}

export function ImageUpload({
  value = [],
  onChange,
  maxFiles = 10,
  uploadUrl = "/api/upload",
  accept = { "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"] },
  onUpload,
  label = "Upload Images",
  className,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      try {
        let newUrls: string[];

        if (onUpload) {
          newUrls = await onUpload(acceptedFiles);
        } else {
          const uploadPromises = acceptedFiles.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            const response = await fetch(uploadUrl, {
              method: "POST",
              body: formData,
            });
            if (!response.ok) throw new Error("Upload failed");
            const data = await response.json();
            return data.url as string;
          });
          newUrls = await Promise.all(uploadPromises);
        }

        onChange([...value, ...newUrls]);
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setUploading(false);
      }
    },
    [value, onChange, onUpload, uploadUrl]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: maxFiles - value.length,
    disabled: uploading || value.length >= maxFiles,
  });

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("space-y-4", className)}>
      {value.length < maxFiles && (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
            isDragActive
              ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
              : "border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5",
            uploading && "cursor-not-allowed opacity-50"
          )}
        >
          <input {...getInputProps()} />
          <div className="space-y-3">
            <div className="font-semibold text-[var(--color-accent)]">
              {uploading ? "Uploading..." : label}
            </div>
            <div className="text-sm text-[var(--color-muted-foreground)]">
              Drag & drop images here, or click to select files
            </div>
            <div className="text-xs text-[var(--color-muted-foreground)]">
              Max {maxFiles} images
            </div>
          </div>
        </div>
      )}

      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-xl overflow-hidden bg-[var(--color-muted)]">
                <img
                  src={url}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove image"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-[var(--color-accent)] text-white px-2 py-0.5 rounded text-xs font-bold">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {value.length > 0 && (
        <div className="text-sm text-[var(--color-muted-foreground)]">
          {value.length} of {maxFiles} images uploaded
        </div>
      )}
    </div>
  );
}
