import axios from 'axios';

const BASE_URL = '/api/persons'

const getAll = () => {
  const request = axios.get(BASE_URL)
  return request.then((response) => response.data)
}

const createNewPerson = (newPersonObject) => {
  const request = axios.post(BASE_URL, newPersonObject)
  return request.then((response) => response.data)
}


const updatePerson = (personId, newPersonObject) => {
  const request= axios.put(`${BASE_URL}/${personId}`, newPersonObject);
  return request.then((response) => response.data)
}

const deletePerson = (personID) => {
  const request = axios.delete(`${BASE_URL}/${personID}`)
  return request.then((response) => response.data)
}

export default {getAll, createNewPerson, deletePerson, updatePerson}