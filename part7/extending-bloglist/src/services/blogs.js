import axios from 'axios'
const baseUrl = '/api/blogs'


const create = async newBlog => {
  const response = await axios.post(baseUrl, newBlog)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { create, getAll }