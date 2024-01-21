import React, { useState } from "react";

// modules
import ImageUploader from "./modules/ImageUploader";
import ImageEditor from "./modules/ImageEditor";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";

// styles
import "./styles/style.scss";

const App = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (imageData) => {
    setPreviewImage(imageData);
  };

  return (
    <>
      <Header />
      <main id="top">
        {!previewImage && (
          <ImageUploader onImageUpload={handleImageUpload} />
        )}
        {previewImage && (
          <ImageEditor previewImage={previewImage} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default App;
