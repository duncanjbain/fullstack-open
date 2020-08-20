import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (newBlogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
  const request = await axios.post(baseUrl, newBlogObject, config)
  console.log(request)
  return request.data
  } catch (error) {
    console.log(error)
  }

}

export default { getAll, addBlog, setToken }