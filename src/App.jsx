import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import "./style/style.scss";

function App() {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (imageData) => {
    setPreviewImage(imageData);
  };

  return (
    <>
      <h1>Image Uploader and Preview</h1>
      <ImageUploader onImageUpload={handleImageUpload} />
      {previewImage && (
        <>
          <h2>Preview</h2>
          <img src={previewImage} />
        </>
      )}
    </>
  );
}

export default App;
