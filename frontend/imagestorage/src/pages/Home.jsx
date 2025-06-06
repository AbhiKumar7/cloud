import React, { useEffect, useState } from "react";
import ImageCarousel from "../compound/imageCarousel/ImageCarusel";
import CreateAlbum from "../compound/createAlbum/CreateAlbum";
import PopModel from "../compound/popModel/PopModel";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import { ChevronRight, ChevronLeft } from "lucide-react";
import {
  createAlbumApi,
  deleteAlbumApi,
  getAlbumAPi,
  updateAlbumApi,
} from "../apiMiddleware/albumApiMiddleware";
const PAGE_SIZE = 10;
function Home() {
  const [showPopUp, setshowPopUp] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [currentPage, setcurrentPage] = useState(0);
  const [loading, setloading] = useState(false);
  const [results, setresults] = useState([]);
  const totalalbum = results.length || 0;
  const noOfPages = Math.ceil(totalalbum / PAGE_SIZE);

  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const [showResults, setshowResults] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState(null);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.album);
  const handleEditClick = (album) => {
    setEditingAlbum(album);
    setshowPopUp(true);
  };
  const handleToggle = () => {
    if (showPopUp) {
      setEditingAlbum(null);
    }
    setshowPopUp((prev) => !prev);
  };

  const fetchData = () => {
    dispatch(getAlbumAPi(inputValue))
      .then((action) => {
        const albums = action?.payload?.albums;

        if (albums) {
          setresults(albums);
          seterrorMessage("");
        } else {
          setresults([]);
          seterrorMessage(
            action?.payload?.message || "No albums found or bad response."
          );
        }
      })
      .catch((err) => {
        setresults([]); // ✅ stay an array
        seterrorMessage(err.message || "Something went wrong.");
      });
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  const hanldeCreateAlbum = ({ name, description, id }) => {
    const albumDetail = { name, description };

    dispatch(createAlbumApi(albumDetail)).then((data) => {
      fetchData();
    });
  };

  const handleAlbumUpdate = ({ name, description, id }) => {
    const albumDetail = { id, name, description };
    if (albumDetail) {
      setloading(true);

      dispatch(updateAlbumApi(albumDetail))
        .then((data) => {
          fetchData();
          handleToggle();
        })
        .finally(() => {
          setloading(false);
        });
    }
  };

  const handleDeleteAlbum = (id) => {
    if (id) {
      setloading(true);
      dispatch(deleteAlbumApi(id))
        .then(() => {
          fetchData();
        })
        .finally(() => {
          setloading(false);
        });
    }
  };
  const goToNextPage = () => {
    setcurrentPage((prev) => prev + 1);
  };
  const goToPrevPage = () => {
    setcurrentPage((prev) => prev - 1);
  };
  const handlePage = (k) => {
    setcurrentPage(k);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Carousel */}
      <div className="mb-6">
        <ImageCarousel />
      </div>

      {/* Album Control Section */}
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          {/* Search */}
          <div className="w-full md:w-2/3 relative">
            <div className="bg-white shadow-sm rounded-md">
              <input
                id="input"
                type="text"
                value={inputValue}
                onChange={(e) => setinputValue(e.target.value)}
                onFocus={() => setshowResults(true)}
                onBlur={() => setshowResults(false)}
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Search albums..."
              />
            </div>

            {showResults && results.length > 0 ? (
              <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {results.map((album) => (
                  <li
                    key={album._id}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {album.name}
                  </li>
                ))}
              </ul>
            ) : (
              <div>{errorMessage}</div>
            )}
          </div>

          {/* Create Album Button */}
          <div className="w-full md:w-auto">
            <button
              onClick={() => handleToggle()}
              className="w-full md:w-auto bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition-all duration-200"
            >
              + Create Album
            </button>
          </div>

          {/* Popup */}
          {showPopUp && (
            <div className="absolute top-16 right-4 z-50">
              <PopModel
                handleToggle={handleToggle}
                hanldeCreateAlbum={hanldeCreateAlbum}
                editingAlbum={editingAlbum}
                handleAlbumUpdate={handleAlbumUpdate}
              />
            </div>
          )}
        </div>

        {/* Album Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
          {results.length === 0 ? (
            <div>no album found</div>
          ) : (
            results
              .slice(start, end)
              .map((album) => (
                <CreateAlbum
                  key={album._id}
                  name={album.name}
                  description={album.description}
                  album={album}
                  handleEditClick={handleEditClick}
                  handleDeleteAlbum={handleDeleteAlbum}
                />
              ))
          )}
          {loading && (
            <div className="absolute left-6/12">
              <ClipLoader size={40} />
            </div>
          )}
        </div>
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 cursor-pointer"
            disabled={currentPage === 0}
            onClick={() => goToPrevPage()}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {[...Array(noOfPages).keys()].map((k) => (
            <span
              className={`${
                currentPage === k ? "bg-blue-700" : ""
              } w-8 h-8 rounded-full text-sm flex items-center justify-center border border-gray-300 text-white bg-blue-300 cursor-pointer`}
              key={k}
              onClick={() => handlePage(k)}
            >
              {k + 1}
            </span>
          ))}
          <button
            disabled={currentPage === noOfPages - 1}
            onClick={() => goToNextPage()}
            className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
