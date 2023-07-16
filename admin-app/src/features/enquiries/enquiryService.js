import axios from 'axios';
import { base_url } from '../../utils/base_url';


const getToken = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const configHeader = {
  headers: {
    Authorization: `Bearer ${getToken?.token}`,
    Accept: "application/json",
  },
}; 


const fetchEnquiry = async() => {
    const response = await axios.get(`${base_url}inquiry/`)
    return response.data
}

const getAEnquiry = async (enqId) =>{
    const response = await axios.get(`${base_url}inquiry/${enqId}`, configHeader)
    return response.data
}

const updateAEnquiry = async (enq) =>{
    const response = await axios.put(`${base_url}inquiry/${enq.id}`, { ...enq.enquiryData }, configHeader)
    return response.data
}

const deleteAEnquiry = async (enqId) =>{
    const response = await axios.delete(`${base_url}enquiry/${enqId}`, configHeader)
    return response.data
}

 const enquiryService = {
    fetchEnquiry,
    getAEnquiry,
    updateAEnquiry,
    deleteAEnquiry,
}

export default enquiryService;