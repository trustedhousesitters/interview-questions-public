import dog from "./PetItem/assets/PetsPlaceholder/Dog.svg";
import cat from "./PetItem/assets/PetsPlaceholder/Cat.svg";
import farmAnimal from "./PetItem/assets/PetsPlaceholder/Farmanimal.svg";
import fish from "./PetItem/assets/PetsPlaceholder/Fish.svg";
import horse from "./PetItem/assets/PetsPlaceholder/Horse.svg";
import poultry from "./PetItem/assets/PetsPlaceholder/Poultry.svg";
import reptile from "./PetItem/assets/PetsPlaceholder/Reptile.svg";
import smallPet from "./PetItem/assets/PetsPlaceholder/Smallpet.svg";


export const CATEGORY_TO_SVG = {
  "dog": dog,
  "cat": cat,
  "farm animal": farmAnimal,
  "fish": fish,
  "horse": horse,
  "poultry": poultry,
  "reptile": reptile,
  "small pet": smallPet,
};

export function normalizeType(raw = "") {
  return String(raw)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/s\b/, "");
}

const TYPE_ALIASES = {
  "rock": "pet rock",   // mock “Rock” → novelty pet
  "rock hyrax": "hyrax",
  "hyrax": "hyrax",
  "bunny": "rabbit",
  "antelope": "antelope",
};

const ANIMAL_TO_CATEGORY = {
  "dog": "dog",
  "cat": "cat",
  "horse": "horse",
  "fish": "fish",

  "snake": "reptile",
  "lizard": "reptile",
  "turtle": "reptile",

  "chicken": "poultry",
  "duck": "poultry",

  "cow": "farm animal",
  "goat": "farm animal",
  "sheep": "farm animal",
  "pig": "farm animal",
  "antelope": "farm animal",

  "guinea pig": "small pet",
  "hamster": "small pet",
  "rabbit": "small pet",
  "ferret": "small pet",
  "hyrax": "small pet",   
  "pet rock": "small pet",
};

export function resolveCategory(rawType, fallback = "small pet") {
  const norm = normalizeType(rawType);
  const canonical = TYPE_ALIASES[norm] ?? norm;
  return ANIMAL_TO_CATEGORY[canonical] ?? fallback;
}

export function svgForType(rawType, fallback) {
  const category = resolveCategory(rawType, fallback);
  return CATEGORY_TO_SVG[category];
}

export function categorizePets(pets = [], fallback) {
    console.log('here in enrich epots')
  return pets.map((p) => {
    const category = resolveCategory(p.type, fallback);
    const icon = CATEGORY_TO_SVG[category];
    return { ...p, category, icon };
  });
}
