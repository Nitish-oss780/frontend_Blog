import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Create = () => {
    const [photo,setPhoto]=useState("");
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [content,setContent]=useState("");
    const [author,setAuthor]=useState("");
    const navigate=useNavigate();
    const handleCreate=async(e)=>{
        e.preventDefault();
        try {
            const postData=new FormData();
            postData.append("title",title);
            postData.append("description",description);
            postData.append("content",content);
            postData.append("author",author);
            postData.append("photo",photo);
            const {data}=await axios.post("https://nitish-blog.onrender.com/api/v1/post",postData)
            if(data?.success){
                navigate('/');
            }else{
                console.log(data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='w-50 p-3 mx-auto'>
      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Content</label>
    <input type="text" className="form-control" id="content" value={content} onChange={(e)=>{setContent(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Author</label>
    <input type="text" className="form-control" id="author" value={author} onChange={(e)=>{setAuthor(e.target.value)}} />
  </div>
  <div className='mb-3'>
                <label className='btn btn-outline-secondary col-md-12'>
                  {photo ? photo.name : "Upload photo"}
                  <input type='file' name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                </label>
              </div>
              <div className='mb-3'>
                {
                  photo && (
                    <div className='text-center'>
                      <img src={URL.createObjectURL(photo)} alt='Product imgage' height={"200px"} className='img img-responsive' />
                    </div>
                  )
                }
              </div>
  
  <button  className="btn btn-primary" onClick={handleCreate} >Create Post</button>
</form>

    </div>
  );
};

export default Create;