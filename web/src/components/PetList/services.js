import axios from 'axios';

export const getImage = async () => {
  const response = await axios.get('https://random.dog/woof?filter=mp4,webm,gif');
  return response.data;
}
