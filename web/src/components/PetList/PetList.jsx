import React, { useEffect, useMemo, useState } from "react";

import "./PetList.css";
import PetItem from "../PetItem/PetItem";
import SearchFilter from "../SearchFilter/SearchFilter";
import { categorizePets } from "../utils";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    let cancelled = false;
    const fetchPets = async () => {
      setStatus("loading");
      setError(null);
      try {
        const res = await fetch("/api/pets");
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setPets(Array.isArray(data) ? data : []);
          const categorized = Array.isArray(data) ? categorizePets(data, "small pet") : [];
          setPets(categorized);
          setStatus("success");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Something went wrong");
          setStatus("error");
        }
      }
    };
    fetchPets();
    return () => {
      cancelled = true;
    };
  }, []);

  const types = useMemo(() => {
    const set = new Set(pets.map((p) => p.type).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [pets]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pets.filter((p) => {
      const matchesType = typeFilter === "All" || p.type === typeFilter;
      const matchesQuery =
        q.length === 0 ||
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.type && p.type.toLowerCase().includes(q));
      return matchesType && matchesQuery;
    });
  }, [pets, query, typeFilter]);

  return (
    <>
      <h1 className="Pets-title">My Pets</h1>

      <SearchFilter
        query={query}
        onQueryChange={setQuery}
        typeOptions={types}
        typeValue={typeFilter}
        onTypeChange={setTypeFilter}
      />

      {status === "loading" && (
        <div role="status" className="Pets-state Pets-state--muted">
          Loading pets…
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="Pets-state Pets-state--error">
          Couldn’t load pets. {error}
        </div>
      )}

      {status === "success" && filtered.length === 0 && (
        <div className="Pets-state Pets-state--muted">
          No pets match your search/filter.
        </div>
      )}

      {status === "success" && filtered.length > 0 && (
        <div className="Pets-grid" data-testid="pets-grid">
          {filtered.map((pet) => (
            <PetItem key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </>
  );
};

export default PetList;
