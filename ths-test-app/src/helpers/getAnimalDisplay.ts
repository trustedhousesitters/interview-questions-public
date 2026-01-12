type Animal = { name: string; count: number };

function getAnimalIcons(animalName: string): string {
  const icons: Record<string, string> = {
    dog: "🐕",
    cat: "🐈",
    reptile: "🦎",
    horse: "🐴",
    fish: "🐠",
    poultry: "🐔",
    "small pet": "🐹",
    "farm animal": "🐄",
  };

  return icons[animalName.toLowerCase()];
}

export function getAnimalDisplay(animals: Animal[]) {
  const totalCount = animals.reduce((sum, animal) => sum + animal.count, 0);
  const iconStrings = animals.map((animal) => getAnimalIcons(animal.name));
  const icons = iconStrings.join(' ');

  return { totalCount, icons };
}
