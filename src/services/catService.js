import axios from 'axios';
import { CAT_API_UPLOAD_URL, CAT_API_FAVORITE_URL, CAT_API_DELETE_FAVORITE_URL } from '../utils/URLConstants';
import { API_KEY } from '../utils/constants';

const getResponse = (status, data) => ({
    status,
    data,
});
const uploadImage = async (image_file) => {
    try {
        let formData = new FormData();
        formData.append('file', image_file);
        axios.defaults.headers.common['x-api-key'] = API_KEY;
        let response = await axios.post(CAT_API_UPLOAD_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return getResponse('SUCCESS', response.data);
    } catch (error) {
        return getResponse('FAILED', error.response.data);
    }
};

const likeCat = async (cat) => {
    const data = {
        image_id: cat.id
    };
    axios.defaults.headers.common['x-api-key'] = API_KEY;
    const response = await axios.post(CAT_API_FAVORITE_URL, data, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response;
};

const deleteFavorite = async ({ favID }) => {
    axios.defaults.headers.common['x-api-key'] = API_KEY;
    return await axios.delete(CAT_API_DELETE_FAVORITE_URL+favID);
};

export { uploadImage, likeCat, deleteFavorite };
