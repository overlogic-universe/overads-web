"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const useImageUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFilesAdded = useCallback(
    (incoming: FileList | File[]) => {
      const arr = Array.from(incoming);
      const images = arr.filter((f) => f.type.startsWith("image/"));

      setFiles((prev) => {
        const merged = [...prev, ...images].filter(
          (v, i, a) =>
            a.findIndex(
              (x) => x.name === v.name && x.size === v.size
            ) === i
        );
        return merged;
      });
    },
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onFilesAdded(e.target.files);
    e.currentTarget.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer?.files?.length) {
      onFilesAdded(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const previews = useMemo(
    () => files.map((f) => URL.createObjectURL(f)),
    [files]
  );

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  return {
    files,
    previews,
    isDragging,
    inputRef,
    handleInputChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    removeFile,
    openFilePicker,
  };
};
