import React, {useState, useEffect} from 'react';
import './PetItem.css';
import {useDispatch} from "react-redux";
import {removePet} from "../../actions";
import close from './assets/close.svg';
import dog from './assets/PetsPlaceholder/Dog.svg'
import axios from 'axios';

const PetItem = ({ pet }) => {
    const { name, type, feeds, id } = pet;
    const [imageUrl, setImageUrl] = useState(dog);
    
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get('https://random.dog/woof.json?filter=mp4').then((res) => {
            if(res && res.data){
                setImageUrl(res.data.url);
            }
        })
    }, []);
    return (
        <div className="Pet-item">
            <div>
                <img src={imageUrl} className="Pet-image" alt="pet" />
            </div>
            <div>
                <div>
                    <span className="Pet-details-label">Name: </span><span>{name}</span>
                </div>
                <div>
                    <span className="Pet-details-label">Animal Type: </span><span>{type}</span>
                </div>
                <div>
                    <span className="Pet-details-label">Number of feeds: </span><span>{feeds}</span>
                </div>
            </div>
            <button className="Delete-button" onClick={() => dispatch(removePet(id))}>
                <img src={close} className="Delete-icon" alt="delete" />
            </button>
        </div>
    );
};

export default PetItem;
