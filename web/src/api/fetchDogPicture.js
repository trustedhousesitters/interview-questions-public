export const fetchDogPicture = async ()=> {
    try {
        const result = await fetch(`https://random.dog/woof?include=jpg`)
        const id = await result.text()
        return id

    } catch(error) {
        return error
    }
};