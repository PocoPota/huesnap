import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import ImageEditor from "./ImageEditor";
import "./style/style.scss";

function App() {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (imageData) => {
    setPreviewImage(imageData);
  };

  return (
    <>
      <ImageUploader onImageUpload={handleImageUpload} />
      {previewImage && (
        <>
          <h2>Preview</h2>
          <ImageEditor previewImage={previewImage} />
        </>
      )}
    </>
  );
}

export default App;
