import React, { useEffect, useState } from "react";

function PopModel({
  handleToggle,
  hanldeCreateAlbum,
  editingAlbum,
  handleAlbumUpdate,
}) {
  const [albumName, setalbumName] = useState("");
  const [albumDescription, setalbumDescription] = useState("");

  useEffect(() => {
    if (editingAlbum) {
      setalbumName(editingAlbum.name);
      setalbumDescription(editingAlbum.description);
      return;
    }
  }, [editingAlbum]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAlbum) {
      handleAlbumUpdate({
        id: editingAlbum._id,
        name: albumName,
        description: albumDescription,
      });
    } else {
      hanldeCreateAlbum({
        name: albumName,
        description: albumDescription,
      });
    handleToggle();

    }

  };

  return ( 
    <>
      <div className="fixed inset-0   flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Create New Album
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Album Name
              </label>
              <input
                type="text"
                value={albumName}
                onChange={(e) => setalbumName(e.target.value)}
                placeholder="Enter album name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows="3"
                placeholder="Enter description"
                value={albumDescription}
                onChange={(e) => setalbumDescription(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => handleToggle()}
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
               {editingAlbum ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PopModel;
