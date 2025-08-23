import styles from "./PetItem.module.css";
import * as Images from "./assets/PetsPlaceholder";

const PetItem = ({ pet }) => {
  const { name, type, feeds } = pet;

  const imageUrl = pet.imageUrl || Images[type] || Images.Farmanimal;
  return (
    <div className={styles.PetItem}>
      <div>
        <img src={imageUrl} className={styles.PetImage} alt="pet" />
      </div>
      <div>
        <div>
          <span className={styles.PetDetailsLabel}>Name: </span>
          <span>{name}</span>
        </div>
        <div>
          <span className={styles.PetDetailsLabel}>Animal Type: </span>
          <span>{type}</span>
        </div>
        <div>
          <span className={styles.PetDetailsLabel}>Number of feeds: </span>
          <span>{feeds}</span>
        </div>
      </div>
    </div>
  );
};

export default PetItem;
