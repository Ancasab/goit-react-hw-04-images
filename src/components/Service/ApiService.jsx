import axios from 'axios';

axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = '45683242-3b486481c07d02865f3573336';

const fetchApi = async (searchQuery, page) => {
    try {
        const response = await axios.get(
            `?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        return response.data; 
    } catch (error) {
        console.error("Error fetching images", error);
        return []; 
    }
};

export default fetchApi;
