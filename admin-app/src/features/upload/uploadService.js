import axios from "axios";
import { base_url } from "../../utils/base_url";


const getToken = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const configHeader = {
  headers: {
    Authorization: `Bearer ${getToken?.token}`,
    Accept: "application/json",
  },
};

const uploadImg = async (data) => {
  try {
    const response = await axios.post(`${base_url}product/upload/`, data, configHeader);
    return response.data;
  } catch (error) {
    console.log('Upload image error:', error);
    throw error;
  }
};

const deleteImg = async (public_id) => {
  try {
    const response = await axios.delete(`${base_url}product/delete-img/${public_id}`, configHeader);
    return response.data;
  } catch (error) {
    console.log('Delete image error:', error);
    throw error;
  }
};


const uploadService = {
    uploadImg,
    deleteImg,
}

export default uploadService;