import React, { useState, useEffect } from "react";
import { useParams, useNavigate, data } from "react-router-dom";
import { Undo2, ImageUp, X, ArrowDownToLine } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import UploadForm from "../compound/uploadForm/UploadForm";
import { getAlbumByIdAPi } from "../apiMiddleware/albumApiMiddleware";
import FadeLoader from "react-spinners/FadeLoader";
import {
  deleteMedia,
  getAllMediaApi,
  uploadFileApi,
} from "../apiMiddleware/mediaApiMiddleware";
import { handleDownload } from "../utils/downloadimage";
function UploadImage() {
  const { albumId } = useParams();
  const [albumName, setalbumName] = useState("");
  const [mediaError, setmediaError] = useState("");
  const [mediaIsLoading, setmediaIsLoading] = useState(false);
  const [showForm, setshowForm] = useState(false);
  const [showMedia, setshowMedia] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchAlbum = async () => {
    await dispatch(getAlbumByIdAPi(albumId)).then((data) => {
      if (data.payload.status) {
        setalbumName(data.payload?.album?.name);
      }
    });
  };

  const fetchMedia = () => {
    dispatch(getAllMediaApi(albumId)).then((data) => {
      const mediaData = data.payload?.album?.media;
      if (mediaData?.length === 0) {
        setmediaError("no media");
      }
      if (data?.payload.status) {
        setshowMedia(mediaData);
        setmediaIsLoading(true);
      }
    });
  };
  // get all album
  useEffect(() => {
    fetchAlbum();
  }, [albumId, dispatch]);
  // get all media by album id
  useEffect(() => {
    fetchMedia();
  }, [albumId]);



  const toggleForm = () => {
    setshowForm((prev) => !prev);
  };
  //  upload image
  const createImage = (title, image) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("avatar", image);
    dispatch(uploadFileApi({ albumId, formData })).then((data) => {
    
      if (data.payload?.status) {
        fetchMedia();
        toggleForm();
      }
    });
  };

  const handleDeleteMedia = async (mediaId) => {
    await dispatch(deleteMedia(mediaId)).then((data) => {
      if (data.payload?.status) {
        fetchMedia();
      }
    });
  };

  return (
    <div className="w-full bg-white px-4 py-3 relative">
      {/* Top Bar */}
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="px-2 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition"
        >
          <Undo2 />
        </button>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search or type here..."
          className="flex-1 min-w-[200px] sm:min-w-[300px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Upload Button */}
        <button
          onClick={toggleForm}
          className={`px-3 py-3 bg-blue-300 font-semibold rounded-full transition cursor-pointer ${
            !showForm ? "bg-blue-600" : "bg-red-400"
          } hover:text-white active:scale-95 active:bg-blue-800`}
        >
          {!showForm ? <ImageUp /> : <X />}
        </button>
      </div>

      {/* Upload Form */}
      {showForm && (
        <div className="absolute  z-10 top-0 mt-2 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[400px]">
          <UploadForm createImage={createImage} />
        </div>
      )}

      {/* Body Content */}
      <div className="container mx-auto mt-4 text-xl sm:text-2xl font-medium">
        <p>{albumName}</p>
      </div>

      {mediaError && <p>{mediaError}</p>}

      {!mediaIsLoading && (
        <div className="absolute top-20 z-auto left-6/12">
          <FadeLoader color="#da16e7" />
        </div>
      )}
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4   relative cursor-pointer">
        {showMedia.map((media, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow group "
          >
            <img
              className="w-full h-100 object-cover"
              src={media.url}
              alt={`media-${index}`}
            />
            <div className="absolute bottom-0 left-0 w-full bg-red-300 bg-opacity-80 text-white text-sm p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
              <p className="text-center capitalize">{media.title}</p>
            </div>
            {/* delete button */}
            <div
              onClick={() => handleDeleteMedia(media._id)}
              className="absolute top-0 left-0  bg-red-500 px-4 py-2 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 cursor-pointer"
            >
              <button>
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            <div
              className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2
               bg-white opacity-0 group-hover:opacity-85 transition-opacity
               rounded-full shadow p-3 cursor-pointer"
              onClick={() => handleDownload(media.url, `${media.title}.jpg`)}
            >
              <ArrowDownToLine className="text-gray-700" />
            </div>
            {media.tags && media.tags.length > 0 && (
              <div className="absolute top-2 right-2 w-36 p-2 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out">
                <ul className=" text-white text-xs ">
                  {media.tags.map((tag, index) => (
                    <div key={index}>
                      <li className="bg-emerald-800 rounded m-1 p-1">
                        <span>#</span> {tag}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadImage;
