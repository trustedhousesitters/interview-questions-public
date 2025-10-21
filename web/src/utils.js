export const filterPets = (pets, searchTerm, petType) => {
    if (!pets || !Array.isArray(pets)) {
        return [];
    }
    
    const trimmedSearchTerm = searchTerm?.trim() || "";
    const trimmedPetType = petType?.trim() || "";
    
    return pets.filter((pet) => {
        if (!trimmedSearchTerm) return true;
        const name = (pet?.name || "").toString();
        return name.toLowerCase().includes(trimmedSearchTerm.toLowerCase());
    }).filter((pet) => {
        if (!trimmedPetType) return true;
        const type = (pet?.type || "").toString();
        return type.toLowerCase() === trimmedPetType.toLowerCase();
    });
};