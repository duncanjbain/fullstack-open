import axios from "axios";

const baseUrl = "http://localhost:3001/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  try {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
  } catch (error) {
    console.log(error)
  }
};

const addBlog = async (newBlogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const request = await axios.post(baseUrl, newBlogObject, config);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

const addLike = async (blogId, totalLikes) => {
  const config = {
    headers: { Authorization: token },
  };
  const patchUrl = `${baseUrl}/${blogId}`
  try {
    const request = await axios.patch(patchUrl, {likes: totalLikes}, config)
    return request.data;
  } catch (error) {
    console.log(error)
  }
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const deleteUrl = `${baseUrl}/${blogId}`
  try {
    const request = await axios.delete(deleteUrl, config)
    return request.data;
  } catch (error) {
    console.log(error)
  }
}

export default { getAll, addBlog, setToken, addLike, deleteBlog };
