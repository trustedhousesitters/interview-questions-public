import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';

import './PetAddModal.css';

const PetItem = ({close}) => {
    const [pet, setPet] = useState({
        name: '',
        type: '',
        feeds: ''
    })
    const [needName, setNeedName] = useState(false)
    const { name, type, feeds } = pet;

    const dispatch = useDispatch()
    const add = () => {
        if(name){
            dispatch({ type: 'add', pet })
            close()
        } else {
            setNeedName(true)
        }
    }

    const updateForm = (name, value) => {
        if(name === "name") {
            setNeedName(false)
            setPet({...pet, name: value })
        } else {
            setPet({...pet, [name]: value })
        }
        
    }

    return (
        <div className="Pet-add-modal-container">
            <div className="Pet-add-modal">
                <div>
                    <div>
                        <span className={`Pet-details-label ${needName && 'highlight'}`}>Name*: </span>
                        <input value={name} onChange={event => updateForm("name", event.target.value)} data-testid="name-input"/>
                    </div>
                    <div>
                        <span className="Pet-details-label">Animal Type: </span>
                        <input value={type} onChange={event => updateForm("type", event.target.value)}/>
                    </div>
                    <div>
                        <span className="Pet-details-label">Number of feeds: </span>
                        <input value={feeds} onChange={event => updateForm("feeds", event.target.value)}/>
                    </div>
                </div>
                <div className="Pet-add-buttons">
                    <button className="Pet-add-button" data-testid="add" onClick={() => add()}>
                        Add
                    </button>
                    <button className="Pet-add-button" onClick={() => close()}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PetItem;
