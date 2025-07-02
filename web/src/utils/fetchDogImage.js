import fallbackDog from "@/components/PetItem/assets/PetsPlaceholder/Dog.svg";

const ALLOWED_IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp)$/i;

export const fetchDogImage = async () => {
  try {
    const response = await fetch("https://random.dog/woof.json");
    const data = await response.json();

    if (data.url && ALLOWED_IMAGE_EXTENSIONS.test(data.url)){
      return data.url;
    } else {
      return fallbackDog;
    }
  } catch (error) {
    console.error("Error fetching dog image:", error);
    return fallbackDog;
  }
};
