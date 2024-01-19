import React, { useRef, useState } from "react";

const ImageEditor = ({ previewImage }) => {
  const [downloadLink, setDownloadLink] = useState(null);
  const canvasRef = useRef(null);

  const applyBackground = async () => {
    try {
      // canvas settings
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Get given image
      const givenImage = new Image();
      givenImage.src = previewImage;
      await givenImage.decode();
      const spaceSize = 140;

      // Set the canvas size
      canvasRef.current.width = givenImage.width + spaceSize * 2;
      canvasRef.current.height = givenImage.height + spaceSize * 2;

      // Get background image
      const backgroundImage = new Image();
      backgroundImage.crossOrigin = "Anonymous";
      backgroundImage.src = `https://api.pocopota.com/hue-maker?w=${canvasRef.current.width}&h=${canvasRef.current.height}`;
      await backgroundImage.decode();

      // Draw background image on canvas
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

      // Definition of shadow
      ctx.shadowColor = "#555555";
      ctx.shadowBlur = 25;

      // Draw given image on canvas
      ctx.drawImage(
        givenImage,
        spaceSize,
        spaceSize,
        givenImage.width,
        givenImage.height
      );

      // Convert canvas content to dataURL
      const dataURL = canvas.toDataURL("image/png");
      setDownloadLink(dataURL);
    } catch (e) {
      console.error("Error Occurred:", e);
    }
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = downloadLink;
    a.download = "huesnap.png";
    a.click();
  };

  return (
    <>
      {previewImage && (
        <>
          {/* <img src={previewImage} /> */}
          <div>
            <canvas ref={canvasRef}></canvas>
            <button onClick={applyBackground}>apply Background</button>
            {downloadLink && <button onClick={handleDownload}>Download</button>}
          </div>
        </>
      )}
    </>
  );
};

export default ImageEditor;
