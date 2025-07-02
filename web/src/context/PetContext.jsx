import React, { createContext, useReducer, useContext, useEffect } from "react";
import petReducer from "./petReducer";

const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const initialState = [];
  const [petState, dispatch] = useReducer(petReducer, initialState);

  // Fetch mock API data
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("/api/pets");
        const data = await response.json();
        dispatch({ type: "SET_PETS", payload: data });
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      }
    };

    fetchPets();
  }, []);

  return (
    <PetContext.Provider value={{ petState, dispatch }}>
      {children}
    </PetContext.Provider>
  );
}

export const usePets = () => useContext(PetContext);
