import React, { useState } from "react";
import { usePets } from "@/context/PetContext";
import "./PetForm.css";

const PetForm = () => {
  const { dispatch } = usePets();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [feeds, setFeeds] = useState(1);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !type) {
      setError("Name and animal type are required.");
      return;
    }

    const newPet = {
      id: Date.now(),
      name,
      type,
      feeds: Number(feeds),
    };

    dispatch({ type: "ADD_PET", payload: newPet });

    setName("");
    setType("");
    setFeeds(1);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="PetForm">
      <h2 className="Pet-form-title">Add a New Pet</h2>
      {error && (
        <p className="Pet-form-error" role="alert">
          {error}
        </p>
      )}
      <div className="Pet-form-grid">
        <div className="Pet-form-field">
          <label htmlFor="pet-name">Name:</label>
          <input
            id="pet-name"
            type="text"
            pattern="^[a-zA-Z\s]+$"
            title="Only letters and spaces are allowed"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="Pet-form-field">
          <label htmlFor="pet-type">Animal Type:</label>
          <select id="pet-type" value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select an animal</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Antelope">Antelope</option>
            <option value="Wild Boar">Wild Boar</option>
            <option value="Rock">Rock</option>
          </select>
        </div>

        <div className="Pet-form-field">
          <label htmlFor="pet-feeds">Number of Feeds:</label>
          <input
            id="pet-feeds"
            type="number"
            value={feeds}
            onChange={(e) => setFeeds(e.target.value)}
            min="1"
            max="10"
            required
          />
        </div>
      </div>
      <button type="submit">Add Pet</button>
    </form>
  );
};

export default PetForm;
