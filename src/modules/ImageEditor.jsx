import React, { useEffect, useRef, useState } from "react";

const ImageEditor = ({ previewImage }) => {
  const [downloadLink, setDownloadLink] = useState(null);
  const canvasRef = useRef(null);

  // Function to create rounded corners
  const roundImage = (image, width, height, radius) => {
    const roundedImageCanvas = document.createElement("canvas");
    roundedImageCanvas.width = width;
    roundedImageCanvas.height = height;
    const roundedImageCtx = roundedImageCanvas.getContext("2d");

    roundedImageCtx.drawImage(image, 0, 0, width, height);

    roundedImageCtx.globalCompositeOperation = "destination-in";
    roundedImageCtx.beginPath();
    roundedImageCtx.moveTo(radius, 0);
    roundedImageCtx.arcTo(width, 0, width, height, radius);
    roundedImageCtx.arcTo(width, height, 0, height, radius);
    roundedImageCtx.arcTo(0, height, 0, 0, radius);
    roundedImageCtx.arcTo(0, 0, width, 0, radius);
    roundedImageCtx.closePath();
    roundedImageCtx.fill();

    return roundedImageCanvas;
  };

  const applyBackground = async () => {
    try {
      // canvas settings
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Get given image
      const givenImage = new Image();
      givenImage.src = previewImage;
      await givenImage.decode();

      // Other settings
      const spaceSize =
        givenImage.width >= givenImage.height
          ? givenImage.width / 17
          : givenImage.height / 17;
      const radius = spaceSize / 6.5;

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

      // Make rounded image
      const roundedImage = roundImage(
        givenImage,
        givenImage.width,
        givenImage.height,
        radius
      );

      // Definition of shadow
      ctx.shadowColor = "#555555";
      ctx.shadowBlur = 25;

      // Draw given image on canvas
      ctx.drawImage(
        roundedImage,
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

  useEffect(() => {
    previewImage && applyBackground();
  }, [previewImage]);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = downloadLink;
    a.download = `huesnap-${crypto.randomUUID().substring(0,8)}.png`;
    a.click();
  };

  return (
    <>
      {previewImage && (
        <section id="imageEditor">
          <canvas ref={canvasRef}></canvas>
          {downloadLink && <button onClick={handleDownload}>Download</button>}
        </section>
      )}
    </>
  );
};

export default ImageEditor;
