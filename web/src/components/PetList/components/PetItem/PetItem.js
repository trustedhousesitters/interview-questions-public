import React, { useEffect, useState } from "react";
import "./PetItem.css";
import close from "./assets/close.svg";
import { useDispatch } from "react-redux";
import { deletePetItem } from "../../actions";
import axios from "axios";

const PetItem = ({ pet }) => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState(null);

  const { name, type, feeds, id } = pet;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://random.dog/woof.json?filter=mp4,webm"
      );

      //Some icons won't be rendered in the browser due to mp4.
      setImageUrl(response.data.url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnClickDelete = () => {
    dispatch(deletePetItem(id));
  };

  return (
    <div className="Pet-item">
      <div>
        <img src={imageUrl} className="Pet-image" alt="pet" />
      </div>
      <div>
        <div>
          <span className="Pet-details-label">Name: </span>
          <span>{name}</span>
        </div>
        <div>
          <span className="Pet-details-label">Animal Type: </span>
          <span>{type}</span>
        </div>
        <div>
          <span className="Pet-details-label">Number of feeds: </span>
          <span>{feeds}</span>
        </div>
      </div>
      <button className="Delete-button" onClick={handleOnClickDelete}>
        <img src={close} className="Delete-icon" alt="delete" />
      </button>
    </div>
  );
};

export default PetItem;
