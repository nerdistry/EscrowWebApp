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

const fetchProductCategory = async () => {
  const response = await axios.get(
    `${base_url}category`
  );
  return response.data;
};

const createProductCategory = async (categoryData) => {
  const response = await axios.post(
    `${base_url}category/create-category/`,
    categoryData,
    configHeader
  );
  return response.data;
};

const getProductCategoryById = async (id) => {
  const response = await axios.get(
    `${base_url}category/${id}`
  );
  return response.data;
};

const updateProductCategory = async (category) => {
  const response = await axios.put(
    `${base_url}category/${category.id}`,
    { title: category.categoryData.title },
    configHeader
  );
  return response.data;
};

const deleteProductCategory = async (categoryId) => {
  const response = await axios.delete(
    `${base_url}category/${categoryId}`,
    configHeader
  );
  return response.data;
};
const productCategoryService = {
  fetchProductCategory,
  createProductCategory,
  getProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
};

export default productCategoryService;
