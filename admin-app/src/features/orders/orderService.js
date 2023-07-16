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
const fetchOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, configHeader);
  return response.data;
};
const orderService = {
  fetchOrders,
};
export default orderService;
