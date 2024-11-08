// import React from 'react'
// import {useQuery } from "react-query"
// import {useParams} from 'react-router-dom'
// import apiBase from "../../utils/apiUrl.js";
// import "./FullBlog.css";

//  function FullBlog() {
//     const {id} =useParams()
//     const {isLoading, isError, error , data} = useQuery({
//       queryKey: ["blog", id],
//       queryFn : async () => {
//         const response = await fetch(`${apiBase}/blog/${id}`,{credentials: "include"})
        
//         console.log("fullblog response",response);
//         if (response.ok === false) {
//           const error = await response.json();
//           throw new Error(error.message);
//         }
//         const data = await response.json();
//         console.log("fullblog data",data);
//         return data;
//       }

//     })
//     if (isLoading){
//       return(
//         <h2 className='text-center text-3xl font-bold mt-5'>loading please wait....</h2>
//       )
//     }
//     if (isError){
//       return(
//         <h2 className='text-center text-3xl font-bold mt-5'>{error.message}</h2>
//       )
//     }
    
    
//   return (
//     <div className='w-1/2 md:w-full mx-auto'>
//        <h2 className='text-3xl font-bold text-center mt-5 mb-5'>{data.title}</h2>
//     <img src={data.imageUrl} alt="full blog image" />
//    <div className="mt-8 mb-8">
//    <p>By{data.user.firstName}</p>
//    </div>
   
//     <p className='text-justify mb-5'>{data.excerpt}</p>
//     <p className='text-justify' dangerouslySetInnerHTML={{__html: data.body}}></p>
//     </div>
//   )
// }
// export default FullBlog;




import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import apiBase from '../../utils/apiUrl.js';
import './FullBlog.css';

function FullBlog() {
  const { id } = useParams();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const response = await fetch(`${apiBase}/blog/${id}`, {
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
    <div className="full-blog-container">
      <h2 className="full-blog-title">{data.title}</h2>
      <img src={data.imageUrl} alt="full blog image" className="full-blog-image" />
      <div className="full-blog-author">By {data.user.firstName}</div>
      <p className="full-blog-excerpt">{data.excerpt}</p>
      <p
        className="full-blog-body"
        dangerouslySetInnerHTML={{ __html: data.body }}
      ></p>
    </div>
  );
}

export default FullBlog;
