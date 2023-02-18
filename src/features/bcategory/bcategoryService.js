import axios from 'axios';
import { base_url } from "../../utils/base_url";
import { config } from '../../utils/axiosConfig';

const getBlogCategories = async () => {
    const response = await axios.get(`${base_url}blogcategory/`);

    return response.data;
};

const createBlogCategory = async (bcategory) => {
    const response = await axios.post(`${base_url}blogcategory/`, bcategory, config);

    return response.data;
};

const bCategoryService = {
    getBlogCategories,
    createBlogCategory
};

export default bCategoryService;