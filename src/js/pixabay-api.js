import axios from 'axios';

const API_KEY = '43249978-ed8444d52eae2c923645cb9a6';

export async function searchImages(query, page = 1, perPage = 15) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage
    });

    try {
        const response = await axios.get(`https://pixabay.com/api/?${params}`);
        return response.data;
    } catch (error) {
        console.error('Error searching images:', error);
        throw error;
    }
}