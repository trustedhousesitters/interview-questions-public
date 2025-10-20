import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PET_TYPES as petTypes } from "../../constants";
import "./PetSearch.css";

const PetSearch = ({ pets = [], onResultsChange }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [petType, setPetType] = useState("");

    const onSearchTermChange = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    const onFilterByPetType = useCallback((type) => {
        setPetType(type);
    }, []);

    const filteredPets = useMemo(() => {
        return pets
            .filter((pet) => {
                if (!searchTerm) return true;
                const name = (pet?.name || "").toString();
                return name.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .filter((pet) => {
                if (!petType) return true;
                const type = (pet?.type || "").toString();
                return type.toLowerCase() === petType.toLowerCase();
            });
    }, [pets, searchTerm, petType]);

    const onClearSearch = useCallback(() => {
        setSearchTerm("");
        setPetType("");
    }, []);

    useEffect(() => {
        if (typeof onResultsChange === "function") {
            onResultsChange(filteredPets);
        }
    }, [filteredPets, onResultsChange]);

    return (
        <div className="Search-container">
            <input
                className="Search-input"
                placeholder="Search by pet name"
                value={searchTerm}
                onChange={onSearchTermChange}
            />
            <div className="Search-type-buttons">
                {petTypes.map((type) => (
                    <button
                        key={type}
                        className={petType === type ? "Search-type-button selected" : "Search-type-button"}
                        onClick={() => onFilterByPetType(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>
            <button className="Search-clear-button" onClick={onClearSearch}>Clear</button>
        </div>
    );
};

export default PetSearch;
