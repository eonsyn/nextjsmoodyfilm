"use client";
import Comment from "@/components/basicComponent/comment";
import ReviewForm from "@/components/userComponent/reviewForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { useSession } from "next-auth/react";
const AllComment = ({ id }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tempReview, settempReview] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/allReviews/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch reviews");

        const data = await response.json();
        setReviews(data.reviews);
      } catch (err) {
        setError(err.message);
      }
    };

    const checkUserLogin = async () => {
      try {
        const storedUser = session?.user;

        if (storedUser) {
          setUser(storedUser);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
    checkUserLogin();
  }, [tempReview]);

  const handleLike = async (reviewId) => {
    try {
      if (!isLoggedIn) {
        const confirmDelete = window.confirm("You have to login first..");
        if (!confirmDelete) return; // Exit if user cancels
        router.push("/login");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/likeReview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reviewId,
            userId: user.id,
          }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.review) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === reviewId ? { ...review, ...data.review } : review
          )
        );
        toast.success("You like this comment!");
      } else {
        toast.error("You have to login first!");
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };

  const handleDislike = async (reviewId) => {
    try {
      if (!isLoggedIn) {
        const confirmLogin = window.confirm("You have to login first..");
        if (!confirmLogin) return; // Exit if user cancels
        router.push("/login");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/dislikeReview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reviewId,
            userId: user.id,
          }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.review) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === reviewId ? { ...review, ...data.review } : review
          )
        );
        toast.success("You dislike this comment!");
      } else {
        toast.error("You have to login first!");
        console.error(data.error);
      }
    } catch (error) {
      toast.error("you have to login first!");
      console.error("Error disliking review:", error);
    }
  };

  const handleDelete = async (commentId) => {
    const confirmDelete = window.confirm(
      "You are sure you want to delete this comment ?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/deleteReview/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("MoodyfilmToken")}`, // Adding token if required
          },
          credentials: "include", // Include credentials in the request
        }
      );

      if (response.ok) {
        toast.success("Review deleted successfully");
        // Update the reviews state to remove the deleted comment
        setReviews((prevReviews) =>
          prevReviews.filter((r) => r.id !== commentId)
        );
      } else {
        const errorData = await response.json();
        console.error("Error deleting review:", errorData.message);
      }
    } catch (error) {
      toast.error("something went wrong!");
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (review) => {
    try {
      // Validate input
      if (!review.trim()) {
        setError("Review cannot be empty.");
        toast.error("Review cannot be empty.");
        return;
      }

      // Prepare the payload
      const payload = {
        filmId: id,
        review,
      };

      // Make API request
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/sendReview`,
        payload,
        {
          withCredentials: true,
        }
      );

      // Handle success
      toast.success("Comment sent successfully!");
      settempReview(review);
      // setReviews((prevReviews) => [...prevReviews, review]);
    } catch (err) {
      console.error("Error submitting review:", err);
      const confirmLogin = window.confirm("You have to login first!");
      if (!confirmLogin) return; // Exit if user cancels
      router.push("/login");
    }
  };
  useEffect(() => {
    console.log("Component mounted or count changed:", user);
  }, [user]);
  return (
    <div className="p-3 ">
      <ToastContainer />
      <h1 className="pt-8 text-white text-4xl font-semibold">
        What people say's:
      </h1>
      <ReviewForm sendMessage={handleSubmit} />

      {reviews.map((review, newkey) => (
        <Comment
          key={newkey}
          {...review}
          onLike={() => handleLike(review.id)}
          onDislike={() => handleDislike(review.id)}
          onDelete={() => handleDelete(review.id)}
        />
      ))}
    </div>
  );
};

export default AllComment;
