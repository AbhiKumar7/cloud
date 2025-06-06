import React, { useEffect, useState } from "react";
import { validateImage } from "../../constant/validation";
import { useSelector } from "react-redux";

function UploadForm({ createImage }) {
  const [image, setimage] = useState(null); // store File object
  const [title, settitle] = useState("");

  const [imageMessage, setimageMessage] = useState(null);
  const [fieldsError, setfieldsError] = useState(null);
  const [showLoader, setshowLoader] = useState(false);
  const uploadStatus = useSelector((state) => state.media.status);
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const valid = validateImage(file.size, setimageMessage, file.type);
    if (valid) {
      setimage(file);
    }
  };

  useEffect(() => {
    if (uploadStatus === "loading") {
      setshowLoader(true);
    }
    if (uploadStatus === "succeeded") {
      setshowLoader(false);
    }
  }, [uploadStatus]);

  const submitImage = (e) => {
    e.preventDefault();

    const missingFields = [];
    if (!title.trim()) missingFields.push("title");
    if (!image) missingFields.push("image");

    if (missingFields.length) {
      setfieldsError(`Please enter ${missingFields.join(", ")}`);
      return;
    }

    createImage(title, image);
    setfieldsError(null);
  };

  return (
    <div className="max-w-xl w-full mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
          Upload Images
        </h2>

        <form onSubmit={submitImage}>
          {/* Title input */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              placeholder="Enter title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            />
          </div>
          {fieldsError && (
            <p className="text-red-600 text-sm mb-4">{fieldsError}</p>
          )}

          {/* File input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Image
            </label>
            <input
              type="file"
              onChange={handleUpload}
              accept="image/*"
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                         file:border file:border-gray-300 file:rounded-md file:bg-gray-100
                         hover:file:bg-gray-200"
            />
          </div>
          {imageMessage && (
            <p className="text-red-500 text-sm mb-4">{imageMessage}</p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition text-sm sm:text-base"
          >
            {showLoader ? "Loading...." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadForm;
