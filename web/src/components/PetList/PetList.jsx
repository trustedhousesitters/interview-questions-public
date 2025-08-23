import styles from "./PetList.module.css";
import { usePets } from "@/hooks/usePets";
import { Feedback } from "@/ui/Feedback/Feedback";
import PetItem from "./components/PetItem";
import SearchBar from "../SearchBar/SearchBar";

const PetList = () => {
  const { status, pets, filterPets, petTypes } = usePets();

  if (status === "loading") {
    return (
      <div role="progressbar">
        <p>Loading...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <Feedback variant="error">
        Something went wrong, please reload the page
      </Feedback>
    );
  }

  return (
    <>
      <h1 className={styles.PetsTitle}>My Pets</h1>

      <SearchBar petTypes={petTypes} onSearch={filterPets} />
      {pets.length > 0 && (
        <ul className={styles.PetList}>
          {pets.map((pet) => (
            <li key={pet.id} className={styles.PetListItem}>
              <PetItem pet={pet} />
            </li>
          ))}
        </ul>
      )}
      {pets.length === 0 && <p>No pets found</p>}
    </>
  );
};

export default PetList;
