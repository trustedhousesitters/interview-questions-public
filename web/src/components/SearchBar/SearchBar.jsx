import styles from "./SearchBar.module.css";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";

const SearchBar = ({ petTypes, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const debouncedCallback = useDebounce(300);

  const handleChange = (e) => {
    setSearchValue(e.target.value);

    debouncedCallback(() =>
      onSearch({ name: e.target.value, type: selectedValue })
    );
  };

  const handleSelectType = (e) => {
    setSelectedValue(e.target.value);
    onSearch({ name: searchValue, type: e.target.value });
  };

  return (
    <div className={styles.SearchBar}>
      <div className={styles.SearchInputContainer}>
        <label className={styles.SearchInputLabel} htmlFor="search">
          Search for a pet name
        </label>
        <input
          className={styles.SearchInput}
          type="search"
          id="search"
          onChange={handleChange}
          value={searchValue}
          placeholder="Search for pet names"
          autoComplete="off"
        />
      </div>

      <div className={styles.SearchInputContainer}>
        <label className={styles.SearchInputLabel} htmlFor="filter-pet-type">
          Filter by pet type
        </label>
        <select
          className={styles.SearchInput}
          id="filter-pet-type"
          onChange={handleSelectType}
        >
          <option value="">Select an option</option>
          {petTypes.map((petType) => (
            <option
              key={petType.toLowerCase().replaceAll(" ", "")}
              value={petType}
            >
              {petType}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
