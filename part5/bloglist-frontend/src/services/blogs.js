import axios from "axios";

const baseUrl = "http://localhost:3001/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
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

export default { getAll, addBlog, setToken, addLike };
