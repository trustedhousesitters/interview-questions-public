import React from "react";
import { PET_TYPES as petTypes } from "../../constants";
import "./PetSearch.css";

const PetSearch = ({ 
    searchTerm = "", 
    petType = "", 
    onSearchTermChange, 
    onPetTypeChange, 
    onClearSearch 
}) => {

    return (
        <div className="Search-container">
            <input
                className="Search-input"
                placeholder="Search by pet name"
                value={searchTerm}
                onChange={onSearchTermChange || (() => {})}
            />
            <div className="Search-type-buttons">
                {petTypes.map((type) => (
                    <button
                        key={type}
                        className={petType === type ? "Search-type-button selected" : "Search-type-button"}
                        onClick={() => onPetTypeChange && onPetTypeChange(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>
            <button className="Search-clear-button" onClick={onClearSearch || (() => {})}>Clear</button>
        </div>
    );
};

export default PetSearch;
