import React, { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
function CreateAlbum({
  name,
  description,
  handleEditClick,
  album,
  handleDeleteAlbum,
}) {
  const [hide, sethide] = useState(false);
  const navigate = useNavigate();
  return (
    <div
     
      onMouseEnter={() => sethide(true)}
      onMouseLeave={() => sethide(false)}
      className="bg-white rounded-xl shadow hover:shadow-md transition-shadow p-4 flex flex-col justify-between h-full relative"
    >
      <div  onClick={() => navigate(`/upload/${album._id}`)}>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      {hide && (
        <div className="absolute -top-3 right-0 flex gap-3">
          <button
            className="  rounded-full text-white p-2 bg-blue-400 hover:bg-blue-700 cursor-pointer"
            onClick={() => handleEditClick(album)}
          >
            <Pencil />
          </button>
          <button
            onClick={() => handleDeleteAlbum(album._id)}
            className="bg-red-400 hover:bg-red-600 cursor-pointer rounded-full text-white p-2"
          >
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateAlbum;
