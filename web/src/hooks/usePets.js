import { filter, uniqBy } from "es-toolkit/compat";
import { useCallback, useEffect, useMemo, useState } from "react";

export const usePets = () => {
  const [status, setStatus] = useState("loading");
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setStatus("loading");
        const response = await fetch("/api/pets");
        if (!response.ok) {
          throw new Error("Bad response");
        }
        const data = await response.json();

        setPets(data ?? []);
        setFilteredPets(data ?? []);
        setStatus("success");
      } catch (e) {
        setStatus("error");
      }
    };

    fetchPets();
  }, []);

  const petTypes = useMemo(() => {
    if (pets && pets.length) {
      return uniqBy(pets.map((pet) => pet.type)).sort();
    }
    return [];
  }, [pets]);

  const filterPets = useCallback(
    (options) => {
      if (!pets) return;

      const filtered = filter(pets, (pet) => {
        const nameMatch = options.name
          ? pet.name.toLowerCase().includes(options.name)
          : true;
        const typeMatch = options.type ? pet.type === options.type : true;

        return nameMatch && typeMatch;
      });

      setFilteredPets(filtered);
    },
    [pets]
  );

  return {
    status,
    pets: status === "success" ? filteredPets : null,
    petTypes,
    filterPets,
  };
};
