export const fetchDogPicture = async ()=> {
    const result = await fetch(`https://random.dog/woof?include=jpg`)
    const id = await result.text()
    return id
};