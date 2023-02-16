import Axios from 'axios';
import { base_url } from "../../utils/base_url";

const getUsers = async () => {
    const response = await Axios.get(`${base_url}user/all-users`);

    return response.data;
};

const customerService = {
    getUsers
};

export default customerService;