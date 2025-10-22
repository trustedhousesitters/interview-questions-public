import { useEffect, useState } from "react";
import "./PetList.css";
import fetchPets from "../../api/FetchPets";
import PetItem from "./components/PetItem/PetItem";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const getPets = async () => {
      try {
        setLoading(true);
        setError(null);
        const petsData = await fetchPets();
        setPets(petsData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Error fetching pets");
        }
      } finally {
        setLoading(false);
      }
    };

    getPets();
  }, []);

  return (
    <section className="Pet-list-container">
      <h1>My Pets</h1>
      {error && <p>{error}</p>}
      {loading && <p>Loading pets..</p>}
      {!loading && pets.length === 0 && !error && <p>No pets found</p>}
      {pets.length > 0 && pets.map((pet) => <PetItem key={pet.id} pet={pet} />)}
    </section>
  );
};

export default PetList;
