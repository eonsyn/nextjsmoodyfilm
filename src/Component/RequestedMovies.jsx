import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const RequestedMovies = () => {
  const [requestedMovies, setRequestedMovies] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null); // State to store the selected film details
  const [filmId, setFilmId] = useState(null); // State to store the id of the film from the API response

  // Fetch requested films from the server
  useEffect(() => {
    const fetchRequestedFilms = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/requested-film`
        );
        setRequestedMovies(response.data); // Store the fetched films
      } catch (error) {
        toast.error("Error fetching requested films");
        console.error(error);
      }
    };

    fetchRequestedFilms();
  }, []);

  // Handle row click to open a popup with the film's details
  const handleRowClick = (film) => {
    setSelectedFilm(film); // Set the selected film to show in the popup
    setFilmId(null); // Reset the filmId when a new film is selected
  };

  // Fetch film details by filmName from the /admin/get-requested-film API
  const handleGetFilmDetails = async (filmName) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/admin/get-requested-film`,
        { params: { filmName } }
      );
      if (response.data.films && response.data.films.length > 0) {
        const filmDetails = response.data.films[0]; // Assuming the first film is the correct one
        setFilmId(filmDetails._id); // Set the fetched film's id
      } else {
        toast.error("No details found for this film.");
      }
    } catch (error) {
      toast.error("Error fetching film details.");
      console.error(error);
    }
  };

  // Handle sending the email
  const handleSendEmail = async () => {
    if (!selectedFilm || !filmId) {
      toast.error("Film details are incomplete.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/send-Email-message`,
        {
          email: selectedFilm.email,
          movielink: `https://moodyfilm.netlify.app/movie/${filmId}`, // Adjust the link as needed
          filmName: selectedFilm.filmName,
        }
      );
      if (response.data.success) {
        toast.success("Email sent and film request deleted successfully.");
        // After successful email, delete the film request from the list
        setRequestedMovies(
          requestedMovies.filter((film) => film._id !== selectedFilm._id)
        );
        setSelectedFilm(null); // Close the popup
        setFilmId(null); // Reset the filmId
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      toast.error("Error sending email.");
      console.error(error);
    }
  };

  // Handle delete functionality
  const handleDeleteFilm = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/admin/delete-request/${id}`
      );
      if (response.data.success) {
        toast.success("Film request deleted successfully.");
        // Remove the deleted film from the state
        setRequestedMovies(requestedMovies.filter((film) => film._id !== id));
      } else {
        toast.error("Failed to delete film request.");
      }
    } catch (error) {
      toast.error("Error deleting film request.");
      console.error(error);
    }
  };

  // Close the film details popup
  const closePopup = () => {
    setSelectedFilm(null); // Reset the selected film state
    setFilmId(null); // Reset the filmId state
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Requested Movies</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 text-left">Film Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {requestedMovies.map((film) => (
              <tr
                key={film._id}
                className="border-b cursor-pointer"
                onClick={() => handleRowClick(film)} // When a row is clicked, open the popup with film details
              >
                <td className="p-4">{film.filmName}</td>
                <td className="p-4">{film.email}</td>
                <td className="p-4">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click event from triggering the row's onClick
                      handleDeleteFilm(film._id); // Delete the film when clicked
                    }}
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup to show film details when a row is clicked */}
      {selectedFilm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Film Details</h2>
            <div className="mb-4">
              <strong>Film Name:</strong> {selectedFilm.filmName}
            </div>
            <div className="mb-4">
              <strong>Email:</strong> {selectedFilm.email}
            </div>
            <div className="mb-4">
              <strong>Requested On:</strong>{" "}
              {new Date(selectedFilm.createdAt).toLocaleDateString()}
            </div>
            {/* Display the film ID when fetched */}
            {filmId && (
              <div className="mb-4">
                <strong>Film ID:</strong> {filmId}
              </div>
            )}

            <div className="flex justify-end gap-4">
              {/* Button to fetch film details */}
              <button
                onClick={() => handleGetFilmDetails(selectedFilm.filmName)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Get Film Details
              </button>

              {/* Button to send email */}
              <button
                onClick={handleSendEmail}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Send Email
              </button>

              {/* Button to close the popup */}
              <button
                onClick={closePopup}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
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
