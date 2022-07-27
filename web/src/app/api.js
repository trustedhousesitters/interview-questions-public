import axios from 'axios';

const baseUrl = 'https://random.dog';

export async function fetchPetImageUrl() {
    try {
        const response = await axios.get(
            `${baseUrl}/woof.json?include=png,jpeg,jpg,gif`
        );
        return response?.data?.url;
    } catch (err) {
        return undefined;
    }
}
