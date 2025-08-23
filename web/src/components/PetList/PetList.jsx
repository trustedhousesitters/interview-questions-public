import styles from "./PetList.module.css";
import { usePets } from "@/hooks/usePets";
import { Feedback } from "@/ui/Feedback/Feedback";
import PetItem from "./components/PetItem";

const PetList = () => {
  const { status, pets } = usePets();

  return (
    <>
      <h1 className={styles.PetsTitle}>My Pets</h1>

      {status === "loading" && (
        <div role="progressbar">
          <p>Loading...</p>
        </div>
      )}
      {status === "error" && (
        <Feedback variant="error">
          Something went wrong, please reload the page
        </Feedback>
      )}
      {status === "success" && pets.length > 0 && (
        <ul className={styles.PetList}>
          {pets.map((pet) => (
            <li key={pet.id} className={styles.PetListItem}>
              <PetItem pet={pet} />
            </li>
          ))}
        </ul>
      )}
      {status === "success" && pets.length === 0 && <p>No pets found</p>}
    </>
  );
};

export default PetList;
