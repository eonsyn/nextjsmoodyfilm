import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestedMovies = () => {
  const [requestedMovies, setRequestedMovies] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [filmId, setFilmId] = useState(null);

  // Fetch requested films from the server
  useEffect(() => {
    const fetchRequestedFilms = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/requested-film`,
          { withCredentials: true }
        );
        setRequestedMovies(response.data);
      } catch (error) {
        toast.error("Error fetching requested films.");
        console.error(error);
      }
    };

    fetchRequestedFilms();
  }, []);

  const handleRowClick = (film) => {
    setSelectedFilm(film);
    setFilmId(null);
  };

  const handleGetFilmDetails = async (filmName) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/admin/get-requested-film`,
        {
          params: { filmName },
          withCredentials: true,
        }
      );
      if (response.data.films && response.data.films.length > 0) {
        setFilmId(response.data.films[0]._id);
      } else {
        toast.error("No details found for this film.");
      }
    } catch (error) {
      toast.error("Error fetching film details.");
      console.error(error);
    }
  };

  const handleSendEmail = async () => {
    if (!selectedFilm || !filmId) {
      toast.error("Film details are incomplete.");
      return;
    }

    const confirmSend = window.confirm(
      `Are you sure you want to send an email for the film "${selectedFilm.filmName}" to "${selectedFilm.email}"?`
    );

    if (!confirmSend) {
      toast.info("Email sending canceled.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/send-Email-message`,
        {
          email: selectedFilm.email,
          movielink: `https://moodyfilm.netlify.app/movie/${filmId}`,
          filmName: selectedFilm.filmName,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Email sent and film request deleted successfully.");
        setRequestedMovies(
          requestedMovies.filter((film) => film._id !== selectedFilm._id)
        );
        setSelectedFilm(null);
        setFilmId(null);
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      toast.error("Error sending email.");
      console.error(error);
    }
  };

  const handleDeleteFilm = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this film request? This action cannot be undone."
    );

    if (!confirmDelete) {
      toast.info("Delete action canceled.");
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/admin/delete-request/${id}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Film request deleted successfully.");
        setRequestedMovies(requestedMovies.filter((film) => film._id !== id));
      } else {
        toast.error("Failed to delete film request.");
      }
    } catch (error) {
      toast.error("Error deleting film request.");
      console.error(error);
    }
  };

  const closePopup = () => {
    setSelectedFilm(null);
    setFilmId(null);
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-6 text-center">Requested Movies</h1>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-left bg-white">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-4">Film Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {requestedMovies.length > 0 ? (
              requestedMovies.map((film) => (
                <tr
                  key={film._id}
                  className="border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(film)}
                >
                  <td className="p-4">{film.filmName}</td>
                  <td className="p-4">{film.email}</td>
                  <td className="p-4">
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFilm(film._id);
                      }}
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No requested movies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedFilm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Film Details</h2>
            <p className="mb-4">
              <strong>Film Name:</strong> {selectedFilm.filmName}
            </p>
            <p className="mb-4">
              <strong>Email:</strong> {selectedFilm.email}
            </p>
            <p className="mb-4">
              <strong>Requested On:</strong>{" "}
              {new Date(selectedFilm.createdAt).toLocaleDateString()}
            </p>
            {filmId && (
              <p className="mb-4">
                <strong>Film ID:</strong> {filmId}
              </p>
            )}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => handleGetFilmDetails(selectedFilm.filmName)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Get Film Details
              </button>
              <button
                onClick={handleSendEmail}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Send Email
              </button>
              <button
                onClick={closePopup}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestedMovies;
