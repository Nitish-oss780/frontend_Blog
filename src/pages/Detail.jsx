import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from "axios";


const Detail = () => {
    const { id } = useParams();
    const [postData,SetPostData]=useState([]);
    const navigate=useNavigate()
    
    const handleDelete=async(e)=>{
          e.preventDefault();
        try {
            const {data}=await axios.delete(`https://nitish-blog.onrender.com/api/v1/delete/${id}`);
            if(data?.success){
                navigate('/');
            }else{
                console.log(data?.message);
            }
        } catch (error) {
            
        }
    }

  useEffect(() => {
    
    const getPost=async()=>{
      try {
        const {data}= await axios.get(`https://nitish-blog.onrender.com/api/v1/getone/${id}`);
          console.log(data);
          SetPostData(data);
          postData?.post&& console.log(postData?.post);
      } catch (error) {
        console.log(error);
      }
    }
    getPost();
    // eslint-disable-next-line
  },[]);

  return (
    <div className="container">
      <h1 className="text-center">Detail Page of Post {postData?.post?.title}</h1>
        <h3 className="text-center" >Author:-{postData?.post?.author}</h3>
        <div className=" text-center">
        <img src={`https://nitish-blog.onrender.com/api/v1/getphoto/${postData?.post?._id}`} style={{ width: "34rem" }} className="img-fluid" alt="..." />
        </div>
        <h3 className="mt-4 text-center" >Description</h3>
        <p className="text-center">{postData?.post?.description}</p>
        <h3 className="mt-4 text-center" >content</h3>
        <p className="text-center">{postData?.post?.content}</p>
        <div className="text-center">
        <button type="button" class="btn btn-primary m-3" onClick={()=>navigate(`/update/${postData?.post?._id}`)}>Edit Post</button>
        <button type="button" class="btn btn-danger" onClick={handleDelete}>Delete Post</button>
        </div>
    </div>
  );
};

export default Detail;
