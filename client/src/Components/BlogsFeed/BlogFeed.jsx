import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import './BlogsFeed.css';
import apiUrl from '../../utils/apiUrl.js';
import { Toaster, toast } from 'sonner';


function BlogFeed() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
 


  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/blogs/user`, {
        credentials: 'include',
      });

      if (response.ok === false) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      
      const data = await response.json();
      return data;
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: async (id) => { // Log the specific blog ID
      const response = await fetch(`${apiUrl}/blog/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
  
      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message); 
      }
  
      const data = await response.json();
      return data;
    },
  
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
      toast.success('Blog deleted successfully', {
        duration: 4000,
      });
    },
  
    onError: (error) => {
      toast.error(error.message, {
        duration: 4000,
      });
    },
  });





  // Handler for editing a blog
  const handleEdit = (id) => {
    navigate(`/update-blog/${id}`);
  };

  if (isLoading) {
    return (
      <h2 className="text-center text-3xl font-bold mt-5">
        Loading, please wait...
      </h2>
    );
  }
  if (isError) {
    return (
      <h2 className="text-center text-3xl font-bold mt-5">{error.message}</h2>
    );
  }

  return (
    <React.Fragment>
      <h2 className="text-2xl uppercase font-medium text-center mt-5">
        <Toaster  position='top-center' richColors/>
        Your Personal Blogs
      </h2>
      <div className="text-center mt-3">
        <Link to="/writing" className="btn btn-primary">
          Create New Blog
        </Link>
      </div>
      <div className="blog-feed-container">
        {data.map((blog) => (
          <div className="blog-card" key={blog.id}>
            <h1 className="blog-title">{blog.title}</h1>
            <p className="blog-date">{new Date(blog.publishedAt).toLocaleDateString()}</p>
            <p className="blog-excerpt">{blog.excerpt}</p>
            <Link to={`/blog/${blog.id}`} className="blog-link">
              Read more
            </Link>
            <div className="blog-actions">
              <button onClick={() => handleEdit(blog.id)} className="edit-button">
                Edit
              </button>
              <button onClick={() => deleteBlogMutation.mutate(blog.id)} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default BlogFeed;



