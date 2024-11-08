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
  return (
    <div className="blog-card">
      {/* Featured Image */}
      <img src={featuredImage} alt="Featured" className="blog-featured-image" />

      {/* Content */}
      <div className="blog-content">
        {/* Title */}
        <h3>{title}</h3>

        {/* Author Info */}
        <div className="blog-author-info">
          {/* Author Avatar or Placeholder */}
          {/* <img
            src={authorAvatar || '/path/to/placeholder-icon.png'}
            alt="Author Avatar"
            className="author-avatar"
          /> */}

          {/* Author Username and Date */}
          <span className="author-username">{authorUsername}</span>
          <span className="post-date">{new Date(updatedAt).toLocaleDateString()}</span>
        </div>

        {/* Excerpt */}
        <p className="blog-excerpt">{excerpt}</p>

        {/* Body */}
        <p className="blog-body">{body}</p>

        {/* Read More Button */}
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
