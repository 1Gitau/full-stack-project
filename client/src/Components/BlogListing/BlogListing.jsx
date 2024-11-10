import React from 'react';
import { Link } from 'react-router-dom';
import './BlogListing.css';
import { useQuery } from 'react-query';
import apiUrl from '../../utils/apiUrl';

// Individual Blog Card Component
function BlogCard({
  id,
  featuredImage,
  title,
  authorUsername,
  updatedAt,
  excerpt,
  body,
}){

// Function to limit the excerpt to a certain number of words on the blog listing page
const getExcerpt = (text, wordLimit) => {
  // Ensure `text` is a string before splitting
  if (typeof text !== "string") {
    return "";
  }

  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

// Example usage
const limitedExcerpt = getExcerpt(excerpt, 20);
const limitedBody = getExcerpt(body, 10);

  return (
    <div className="blog-card">
      
      <img src={featuredImage} alt="Featured" className="blog-featured-image" />

   
      <div className="blog-content">
   
        <h3>{title}</h3>

      
        <div className="blog-author-info">
        
          <span className="author-username">{authorUsername}</span>
          <span className="post-date">{updatedAt}</span>
        </div>

     
        <p className="blog-excerpt">{limitedExcerpt}</p>

      
        <p className="blog-body">{limitedBody}</p>

    
        <Link to={`/blog/${id}`} className="read-more-btn">
          Read More
        </Link>
      </div>
    </div>
  );
};

// Main Blog Listing Component
function BlogListing(){
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/blogs`, { credentials: "include" });
      if (response.ok === false) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      
      const data = await response.json();
      console.log(data)
      return data;
    },
  });

  // Loading State
  if (isLoading) {
    return <div>Loading, please wait...</div>;
  }

  // Error State
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Blog List
  return (
    <div className="blog-listing">
      {
        data.blog.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            featuredImage={blog.imageUrl}
            title={blog.title}
            authorUsername={blog.authorUsername}
            updatedAt={blog.updatedAt}
            excerpt={blog.excerpt}
            body={ <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>}
          />
        ))
      }
        
    </div>
  );
};

export default BlogListing;
