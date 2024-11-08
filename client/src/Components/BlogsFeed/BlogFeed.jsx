// import React from 'react'
// import{useQuery} from "react-query"
// import {Link} from "react-router-dom"
// import apiBase from "../../utils/apiUrl.js"
// function BlogFeed() {

//     const{isLoading,isError,error, data}=useQuery({
//         queryKey: ["blogs"],
//         queryFn: async () => {
//             const respose = await fetch(`${apiBase}/blogs/user`,{
//                 credentials: "include"
//             });

//             console.log(respose);
//             if (respose.ok === false ){
//                 const error = await respose.json()
//                 throw new Error(error.message)
//             }
//             const data = await respose.json()
//             return data;
           
//         },
    
//         // onSuccess:(data)=>{
//         //     setBlogs(data)
//         // }
//     })

//     if (isLoading){
//         return <h2 className='text-center text-3xl font-bold mt-5'>loading please wait....</h2>
//     }
//     if (isError){
//         return <h2 className='text-center text-3xl font-bold mt-5'>{error.message}</h2>
//     }
//     // if(data.blog.length === 0){
//     //   return(
//     //   <div>
//     //     <h3 className='text-center text-3xl font-bold mt-5'>
//     //       you do not have any blogs yet.{""}
//     //         <Link to = "/write" className='text-blue-600 underline'>create one
//     //         </Link>
//     //       </h3>
//     //   </div>
//     //   )
//     // }
//     return(
//       <React.Fragment>
//         <h2 className=' text-2xl uppercase font-medium text text-center mt-5'> your personal blogs</h2>
//         <div className='flex justify-center gap-5 flex-wrap mt-5'>
//           {
//               data.map((blog, i)=>(
//                 <div key={i}>
//                   <h1>{blog.title}</h1>
//                   <p>{blog.excerpt}</p>
//                   <p>{blog.body}</p>
//                   <p>{blog.id}</p>
//                 </div>
//               ))
//           }

//         </div>

//       </React.Fragment>
//     )
// }

// export default BlogFeed




import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import apiBase from '../../utils/apiUrl.js';
import './BlogsFeed.css';

function BlogFeed() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await fetch(`${apiBase}/blogs/user`, {
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      return response.json();
    },
  });

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
        Your Personal Blogs
      </h2>
      <div className="blog-feed-container">
        {data.map((blog, i) => (
          <div className="blog-card" key={i}>
            <h1 className="blog-title">{blog.title}</h1>
            <p className="blog-excerpt">{blog.excerpt}</p>
            <p className="blog-body">{blog.body}</p>
            <Link to={`/blog/${blog.id}`} className="blog-link">
              Read more
            </Link>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default BlogFeed;
