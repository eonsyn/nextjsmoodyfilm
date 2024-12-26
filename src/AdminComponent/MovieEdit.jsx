import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const MovieEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    filmTitle: "",
    genre: [],
    imageData: [],
    urlOfPost: "",
    urlOfThumbnail: "",
    downloadData: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLink = async (finalLink) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/testdownload`,
        {
          method: "POST", // Use POST instead of GET
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: finalLink }), // Send the body with the request
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the download link");
      }
      toast.success("download link generated");
      const data = await response.json();
      // Update the downloadHref with the new final link
      const updatedMovie = { ...formData };
      updatedMovie.downloadData = updatedMovie.downloadData.map((download) =>
        download.finalLink === finalLink
          ? { ...download, downloadHref: data.finalLink }
          : download
      );
      setFormData(updatedMovie);
    } catch (error) {
      toast.error(error);
      console.error("Error reloading download link:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/film/${id}`,
          {
            withCredentials: true, // Include cookies in the request
          }
        );
        const data = response.data;
        setFormData({
          filmTitle: data.filmTitle || "",
          genre: data.genre || [],
          imageData: data.imageData || [],
          urlOfPost: data.urlOfPost || "",
          urlOfThumbnail: data.urlOfThumbnail || "",
          downloadData: data.downloadData || [],
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch film data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayChange = (e, fieldName, index) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedArray = [...prevData[fieldName]];
      updatedArray[index] = value;
      return {
        ...prevData,
        [fieldName]: updatedArray,
      };
    });
  };

  const handleDownloadDataChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedDownloadData = [...prevData.downloadData];
      updatedDownloadData[index] = {
        ...updatedDownloadData[index],
        [field]: value,
      };
      return {
        ...prevData,
        downloadData: updatedDownloadData,
      };
    });
  };

  const addDownloadData = () => {
    setFormData((prevData) => ({
      ...prevData,
      downloadData: [
        ...prevData.downloadData,
        { title: "", finalLink: "", downloadHref: "", error: null },
      ],
    }));
  };

  const removeDownloadData = (index) => {
    setFormData((prevData) => {
      const updatedDownloadData = [...prevData.downloadData];
      updatedDownloadData.splice(index, 1);
      return {
        ...prevData,
        downloadData: updatedDownloadData,
      };
    });
  };

  const removeArrayItem = (fieldName, index) => {
    setFormData((prevData) => {
      const updatedArray = [...prevData[fieldName]];
      updatedArray.splice(index, 1);
      return {
        ...prevData,
        [fieldName]: updatedArray,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/admin/updateFilm/${id}`,
        formData,
        {
          withCredentials: true, // Include cookies in the request
        }
      );

      navigate("/admin/MovieUpdate");
    } catch (err) {
      setError("Failed to update film data.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="movie-edit-container p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <ToastContainer />{" "}
      <h1 className="text-2xl font-bold text-primary mb-6">Edit Movie</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-secondary font-medium mb-2">
            Film Title:
          </label>
          <input
            type="text"
            name="filmTitle"
            value={formData.filmTitle}
            onChange={handleChange}
            className="w-full p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-secondary font-medium mb-2">
            Genres:
          </label>
          {formData.genre.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange(e, "genre", index)}
                className="flex-1 p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                className="hover:text-white border hover:border-white border-black text-black bg-accent px-4 py-2 rounded hover:bg-yellow-600"
                onClick={() => removeArrayItem("genre", index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({ ...prev, genre: [...prev.genre, ""] }))
            }
            className="hover:text-white hover:border-white text-black border border-black bg-primary px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Genre
          </button>
        </div>

        <div>
          <label className="block text-secondary font-medium mb-2">
            Image Data:
          </label>
          {formData.imageData.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange(e, "imageData", index)}
                className="flex-1 p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                className="hover:text-white  hover:border-white text-black border border-black bg-accent px-4 py-2 rounded hover:bg-yellow-600"
                onClick={() => removeArrayItem("imageData", index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                imageData: [...prev.imageData, ""],
              }))
            }
            className="hover:text-white hover:border-white text-black border border-black bg-primary px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Image
          </button>
        </div>

        <div>
          <label className="block text-secondary font-medium mb-2">
            Post URL:
          </label>
          <input
            type="text"
            name="urlOfPost"
            value={formData.urlOfPost}
            onChange={handleChange}
            className="w-full p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-secondary font-medium mb-2">
            Thumbnail URL:
          </label>
          <input
            type="text"
            name="urlOfThumbnail"
            value={formData.urlOfThumbnail}
            onChange={handleChange}
            className="w-full p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-secondary font-medium mb-2">
            Download Data:
          </label>
          {formData.downloadData.map((data, index) => (
            <div
              key={index}
              className="space-y-2 mb-4 p-4 border rounded shadow"
            >
              <input
                type="text"
                placeholder="Title"
                value={data.title}
                onChange={(e) =>
                  handleDownloadDataChange(index, "title", e.target.value)
                }
                className="w-full p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary mb-2"
              />
              <input
                type="text"
                placeholder="Final Link"
                value={data.finalLink}
                onChange={(e) =>
                  handleDownloadDataChange(index, "finalLink", e.target.value)
                }
                className="w-full p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary mb-2"
              />
              <input
                type="text"
                placeholder="Download Href"
                value={data.downloadHref}
                onChange={(e) =>
                  handleDownloadDataChange(
                    index,
                    "downloadHref",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary mb-2"
              />
              <input
                type="text"
                placeholder="Error"
                value={data.error}
                onChange={(e) =>
                  handleDownloadDataChange(index, "error", e.target.value)
                }
                className="w-full p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary mb-2"
              />
              {data.downloadHref ? null : (
                <button
                  type="button"
                  onClick={() => loadLink(data.finalLink)}
                  className="hover:text-white hover:border-white text-black border border-black bg-accent px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Fill DownloadHref
                </button>
              )}
              <button
                type="button"
                onClick={() => removeDownloadData(index)}
                className="hover:text-white hover:border-white text-black border border-black bg-accent px-4 py-2 rounded hover:bg-yellow-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addDownloadData}
            className="hover:text-white text-black border hover:border-white border-black bg-primary px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Download Data
          </button>
        </div>

        <button
          type="submit"
          className=" text-white hover:border-white border border-black  w-full bg-secondary px-4 py-2 rounded bg-blue-700 font-bold"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default MovieEdit;
