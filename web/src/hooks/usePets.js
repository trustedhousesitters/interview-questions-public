import { useEffect, useState } from "react";

export const usePets = () => {
  const [status, setStatus] = useState("idle");
  const [pets, setPets] = useState([]);

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
        setStatus("success");
      } catch (e) {
        setStatus("error");
      }
    };

    fetchPets();
  }, []);

  return {
    status,
    pets: status === "success" ? pets : null,
  };
};
