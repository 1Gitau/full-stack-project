import React, { useState } from "react";
import { Editor } from "primereact/editor";
import { useMutation } from "react-query";
import apiUrl from "../../utils/apiUrl";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import './Writing.css';

function Writing() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (postData) => {
      const response = await fetch(`${apiUrl}/create-blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Post created successfully", {
        duration: 2000,
      });
      setTimeout(() => {
        navigate("/blog-listing");
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 3000,
      })
    },
  });

  const handleImageUpload = async () => {
    if (!featuredImage) return null;

    const formData = new FormData();
    formData.append("file", featuredImage);
    formData.append("upload_preset", "b6g807uv");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/ddd1nl0nf/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      console.error("Error uploading image to Cloudinary");
      return null;
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    if (featuredImage) {
      imageUrl = await handleImageUpload();
      if (!imageUrl) {
        alert("Image upload failed. Please try again.");
        return;
      }
    } else {
      alert("Please select a featured image before submitting.");
      return;
    }

    const postData = {
      title,
      excerpt,
      body,
      imageUrl,
    };

    mutate(postData);
  };

  return (
    <div className="outer-container">
      <div className="writing-container">
        <Toaster position="top-center" richColors />
        <h1 className="heading">Create New Blog</h1>
        <form >
          <div className="mb-4">
            <label>Featured Image (required)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFeaturedImage(e.target.files[0])}
              required
            />
          </div>
          <div className="mb-4">
            <label>Title (required)</label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title here"
              maxLength="150"
              required
              className="w-full p-2 border rounded"
            />
            <p>{title.length}/100</p>
          </div>
          <div className="mb-4">
            <label>Excerpt (required)</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Enter Excerpt here"
              maxLength="300"
              required
              className="w-full p-2 border rounded"
            />
            <p>{excerpt.length}/300</p>
          </div>
          <div className="mb-4">
            <label>Body (required)</label>
            <Editor
              style={{ height: "320px" }}
              value={body}
              onTextChange={(e) => setBody(e.htmlValue)}
            />
            <p>{body.length}/1000</p>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Please wait..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Writing;
