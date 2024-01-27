import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [postData,SetPostData]=useState([]);
  
  useEffect(() => {
    const getPost=async()=>{
      try {
        const {data}= await axios.get('/api/v1/getall');
          // console.log(data);
          SetPostData(data);
          postData?.post&& console.log(postData?.post);
      } catch (error) {
        console.log(error);
      }
    }
    getPost();
    
  }, [])
  

  return (
    <div className="container">
      <h1 className="text-center">All Blogs are show here</h1>
      <div className="container d-flex flex-wrap justify-content-center">
      {postData?.post?.map((item) => (
        <div className="card" key={item.id} style={{ width: "18rem",margin:"1rem" }}>
          <img src={`https://nitish-blog.onrender.com/api/v1/getphoto/${item._id}`} style={{ height: "12rem" }} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">
              {item.description}
            </p>
            <Link to={`/detail/${item._id}`} className="btn btn-primary">
             More Details
            </Link>
          </div>
        </div>
      ))}
        
        

      </div>
    </div>
  );
};

export default Home;
