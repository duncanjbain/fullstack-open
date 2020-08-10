import axios from 'axios';

const BASE_URL = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(BASE_URL)
  return request.then((response) => response.data)
}

const createNewPerson = (newPersonObject) => {
  const request = axios.post(BASE_URL, newPersonObject)
  return request.then((response) => response.data)
}

export default {getAll, createNewPerson}