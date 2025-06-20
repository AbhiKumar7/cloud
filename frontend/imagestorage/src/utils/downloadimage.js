export const handleDownload = async (url, filename = "image.jpg") => {
  try {
    // Force HTTPS
    const secureUrl = url.replace(/^http:\/\//, "https://");

    const response = await fetch(secureUrl);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
    alert("Failed to download image.");
  }
};
