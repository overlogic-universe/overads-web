"use client";

import { useState } from "react";

export const useCreateAdForm = () => {
  const [platform, setPlatform] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [useAutoText, setUseAutoText] = useState(false);

  const resetForm = () => {
    setPlatform("");
    setTitle("");
    setDescription("");
    setTheme("");
    setUseAutoText(false);
  };

  return {
    platform,
    setPlatform,
    title,
    setTitle,
    description,
    setDescription,
    theme,
    setTheme,
    useAutoText,
    setUseAutoText,
    resetForm,
  };
};
