import dog from "../components/PetList/components/PetItem/assets/PetsPlaceholder/Dog.svg";
import cat from "../components/PetList/components/PetItem/assets/PetsPlaceholder/Cat.svg";
import bird from "../components/PetList/components/PetItem/assets/PetsPlaceholder/Bird.svg";
import horse from "../components/PetList/components/PetItem/assets/PetsPlaceholder/Horse.svg";
import fish from "../components/PetList/components/PetItem/assets/PetsPlaceholder/Fish.svg";

export const featuredListings = [
  {
    id: 1,
    name: "Max",
    type: "Dog",
    description: "Energetic golden retriever looking for an active family",
    imageUrl: dog,
  },
  {
    id: 2,
    name: "Luna",
    type: "Cat",
    description: "Gentle and affectionate indoor cat, loves to cuddle",
    imageUrl: cat,
  },
  {
    id: 3,
    name: "Charlie",
    type: "Bird",
    description: "Colorful parrot with a playful personality",
    imageUrl: bird,
  },
  {
    id: 4,
    name: "Thunder",
    type: "Horse",
    description: "Majestic horse perfect for experienced riders",
    imageUrl: horse,
  },
  {
    id: 5,
    name: "Nemo",
    type: "Fish",
    description: "Beautiful tropical fish for your aquarium",
    imageUrl: fish,
  },
];
