const GenerateImage = () => {
    const BASE_URL = 'https://random.dog/';
    const API = `${BASE_URL}doggos?filter=mp4,webm`;

    return fetch(API)
        .then(res => res.json())
        .then((result) => `${BASE_URL}${result[Math.floor(Math.random() * result.length)]}`, (error) => console.error(error))
}

export default GenerateImage;
