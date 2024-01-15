import React, { useState } from "react";

const ImageUploader = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && <img src={selectedImage} />}
    </>
  );
};

export default ImageUploader;
