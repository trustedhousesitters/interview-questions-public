import React from "react";
import "./FeaturedListing.css";
import dog from "../PetList/components/PetItem/assets/PetsPlaceholder/Dog.svg";

const FeaturedListing = ({ listing }) => {
  const { name, type, description, imageUrl } = listing;
  const image = imageUrl || dog;

  return (
    <div className="featured-listing">
      <div className="featured-listing-image-container">
        <img 
          src={image} 
          alt={`Featured Image of a ${type} named ${name}`}
          className="featured-listing-image"
        />
      </div>
      <div className="featured-listing-content">
        <h3 className="featured-listing-name">{name}</h3>
        <p className="featured-listing-type">{type}</p>
        {description && (
          <p className="featured-listing-description">{description}</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedListing;
