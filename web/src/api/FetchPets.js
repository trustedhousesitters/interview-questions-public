const FetchPets = async () => {
  const response = await fetch("/api/pets");

  if (!response.ok) {
    throw new Error(`Error in response: ${response.status}`);
  }

  return response.json();
};

export default FetchPets;
