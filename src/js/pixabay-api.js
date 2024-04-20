import axios from 'axios';

const API_KEY = '43249978-ed8444d52eae2c923645cb9a6';

export async function searchImages(query, page = 1, perPage = 20) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
    });

    try {
        const response = await axios.get(`https://pixabay.com/api/?${params}`);
        console.log(response.data);
        return response.data.hits;
    } catch (error) {
        console.error('Error searching images:', error);
        throw error;
    }
}