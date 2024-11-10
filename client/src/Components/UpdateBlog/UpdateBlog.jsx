import React, { useState, useEffect} from "react";
import { Editor } from "primereact/editor";
import { useMutation, useQuery } from "react-query";
import apiUrl from "../../utils/apiUrl";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
// import './Writing.css';
import { useParams } from "react-router-dom";

function UpdateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");


  const { id: blogId } = useParams();


  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/blog/${blogId}`, {
        credentials: "include",
      });

      if (response.ok === false) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    },

    onError: (error) => {
      toast.error(error.message, { duration: 3000 });
    },
  });

  // Populate state variables once the data is successfully loaded
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setExcerpt(data.excerpt);
      setBody(data.body);
    }
  }, [data]);

  const {mutate, isLoading: isUpdating} = useMutation({
    mutationFn: async (updateBlog) => {
      const response = await fetch(`${apiUrl}/blog/update/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateBlog),
        credentials: "include",
      });


      console.log(response);
      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      console.log(data);
      return data;
    },

    onSuccess: () => {
      toast.success("Blog updated successfully", { duration: 3000 });
      setTimeout(() => {
        navigate("/blog-feed");
      }, 2000);
    },

    onError: (error) => {
      toast.error(error.message, { duration: 3000 });
    },
  })

  if (isLoading) {
    return <p>Loading blog data...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

 



  const handleSubmit = async (e) => {

    const postData = {
      title,
      excerpt,
      body,
    };
    console.log(postData);

    mutate(postData);
  };

  return (
    <div className="outer-container">
      <div className="writing-container">
        <Toaster position="top-center" richColors />
        <h1 className="heading">Create New Blog</h1>
        <form onSubmit={handleSubmit}>
          {/* <div className="mb-4">
            <label>Featured Image ()</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFeaturedImage(e.target.files[0])}
              
            />
          </div> */}
          <div className="mb-4">
            <label>Title ()</label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title here"
              maxLength="150"
              
              className="w-full p-2 border rounded"
            />
            <p>{title.length}/100</p>
          </div>
          <div className="mb-4">
            <label>Excerpt ()</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Enter Excerpt here"
              maxLength="300"
              
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label>Body ()</label>
            <Editor
              style={{ height: "320px" }}
              value={body}
              onTextChange={(e) => setBody(e.htmlValue)}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateBlog;
