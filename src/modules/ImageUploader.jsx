import React from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = ({ onImageUpload }) => {
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      // Limit the number of uploaded images to 1
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ['image/*'],
    maxFiles: 1, // Limit the number of uploaded files
    onDrop,
  });

  return (
    <>
      <section id="imageUploader" {...getRootProps()}>
        <input {...getInputProps()} />
        <div>Drag & drop an image here, or click to select one.</div>
      </section>
    </>
  );
};

export default ImageUploader;
