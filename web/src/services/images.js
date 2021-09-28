
export const getRandomDogImage = () => fetch('https://random.dog/woof?include=png,jpg')
    .then(res => res.text())
    .then(url => `https://random.dog/${url}`);
