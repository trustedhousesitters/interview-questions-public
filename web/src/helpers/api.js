export const fetchRandomDogImage = async() => {
    const response = await fetch('https://random.dog/woof?include=jpg, jpeg');
    const data = await response.text();
    return data;
};
