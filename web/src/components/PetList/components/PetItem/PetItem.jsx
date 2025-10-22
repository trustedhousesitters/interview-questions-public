import "./PetItem.css";
import dog from "./assets/PetsPlaceholder/Dog.svg";

const PetItem = ({ pet }) => {
  const { name, type, feeds } = pet;
  const imageUrl = pet.imageUrl || dog;
  return (
    <div className="Pet-item">
      <div>
        <img src={imageUrl} className="Pet-image" alt="pet" />
      </div>
      <div>
        <div className="Pet-detail">
          <span className="Pet-detail-label">Name: </span>
          <span>{name}</span>
        </div>
        <div className="Pet-detail">
          <span className="Pet-detail-label">Animal Type: </span>
          <span>{type}</span>
        </div>
        <div className="Pet-detail">
          <span className="Pet-detail-label">Number of feeds: </span>
          <span>{feeds}</span>
        </div>
      </div>
    </div>
  );
};

export default PetItem;
