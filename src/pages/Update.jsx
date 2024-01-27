import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const { id } = useParams();
  const [postData, SetPostData] = useState([]);

  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const post = new FormData();
      post.append("title", postData.title);
      post.append("description", postData.description);
      post.append("content", postData.content);
      post.append("author", postData.author);
      post.append("photo", photo);
      const { data } = await axios.put(`/api/v1/update/${postData._id}`, post);
      if (data?.success) {
        navigate(`/detail/${postData._id}`);
      } else {
        console.log(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(
          `https://nitish-blog.onrender.com/api/v1/getone/${id}`
        );
        console.log(data.post);
        SetPostData(data.post);

        postData?.post && console.log(postData?.post);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();

    //  eslint-disable-next-line
  }, []);

  return (
    <>
      <h1 className="text-center">Update Post</h1>
      {postData && (
        <div className="w-50 p-3 mx-auto">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={postData?.title}
                onChange={(e) => {
                  SetPostData({ ...postData, title: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={postData?.description}
                onChange={(e) => {
                  SetPostData({ ...postData, description: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Content
              </label>
              <input
                type="text"
                className="form-control"
                id="content"
                value={postData?.content}
                onChange={(e) => {
                  SetPostData({ ...postData, content: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Author
              </label>
              <input
                type="text"
                className="form-control"
                id="author"
                value={postData?.author}
                onChange={(e) => {
                  SetPostData({ ...postData, author: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Product imgage"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>

            <button className="btn btn-primary" onClick={handleUpdate}>
              Update Post
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Update;
