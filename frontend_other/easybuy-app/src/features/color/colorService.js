import axios from 'axios';
import { base_url } from "../../utils/baseUrl";


const getToken = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const configHeader = {
  headers: {
    Authorization: `Bearer ${getToken?.token}`,
    Accept: "application/json",
  },
};
const fetchColor = async() => {
    const response = await axios.get(`${base_url}color/`)
    return response.data
}

const createColor = async(colorData) => {
    const response = await axios.post(`${base_url}color/`, colorData, configHeader)
    return response.data
}

const getColorById = async(colorId) => {
  const response = await axios.get(`${base_url}color/${colorId}`, configHeader)
  return response.data
}

const updateAColor = async(color) => {
  const response = await axios.put(`${base_url}color/${color.id}`, { title: color.colorData.title }, configHeader)
  return response.data
}

const deleteAColor = async(colorId) => {
  const response = await axios.delete(`${base_url}color/${colorId}`, configHeader)
  return response.data
}

 const colorService = {
    fetchColor,
    createColor,
    getColorById,
    updateAColor,
    deleteAColor,
}

export default colorService;