import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import GenerateImage from '../../../../api/GenerateImage';

import './AddPet.css';

const DEFAULT_PET = { name: '', type: '', age: '', feeds: ''};

const AddPet = () => {
    const [pet, setPet] = useState(DEFAULT_PET)
    const dispatch = useDispatch();

    const addPet = useCallback(async () => {
        if(!pet.name) {
            return;
        }

        const petWithImage = {
            ...pet,
            imageUrl: await GenerateImage(),
        }

        dispatch({ type: 'ADD_PET', payload: petWithImage });

        return setPet(DEFAULT_PET);
    }, [pet, dispatch]);

    useEffect(() => {
        const listenToEnter = (e) => {
          if (e.code === "Enter" || e.code === "NumpadEnter") {
            e.preventDefault();
            addPet();
          }
        };
        document.addEventListener("keydown", listenToEnter);
        return () => {
          document.removeEventListener("keydown", listenToEnter);
        };
      }, [addPet]);

    return (
        <div className="Add-pet">
            <h1>Add Pet</h1>
            <div className="Form">
                <div>
                    <label>Name:</label>
                    <input type='text' value={pet.name} onChange={(e) => setPet({ ...pet, name: e.target.value })} />
                </div>
                <div>
                    <label>Animal type:</label>
                    <input type='text' value={pet.type} onChange={(e) => setPet({ ...pet, type: e.target.value })} />
                </div>
                <div>
                    <label>Age:</label>
                    <input type='number' value={pet.age} onChange={(e) => setPet({ ...pet, age: e.target.value })} />
                </div>
                <div>
                    <label>Number of feeds:</label>
                    <input type='number' value={pet.feeds} onChange={(e) => setPet({ ...pet, feeds: e.target.value })} />
                </div>
                <button onClick={() => addPet()} disabled={!pet.name}>
                    Add pet
                </button>
            </div>  
        </div>
    );
};

export default AddPet;
