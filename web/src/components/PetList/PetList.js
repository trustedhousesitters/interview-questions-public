import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PetItem from './components/PetItem';
import { getPets } from './selectors';
import { Link } from 'react-router-dom';
import { fetchDogPicture } from '../../api/fetchDogPicture';
import { addImages } from './actions';
import './PetList.css';

const createPromise = (length) => {
    const promise = []
    for(let i = 0; i < length; i += 1) {
        promise.push(fetchDogPicture())
    }
    return promise
}

const PetList = () => {
    const pets = useSelector(getPets);
    const dispatch = useDispatch()
    const [isLoading, setIsloading] = useState(false)

    const nPromises = createPromise(pets.length)

    useEffect(()=>{
        setIsloading(true)
        if(!pets[0].imageUrl){
            Promise.all(nPromises).then((images)=>{
                const petsWithImages = pets.map((pet, index)=>{
                    return{...pet, imageUrl: images[index] }
                })
                dispatch(addImages(petsWithImages))
                setIsloading(false)
            })
        }else{
            setIsloading(false)
        }
    },[dispatch, nPromises, pets])

    if(isLoading){
        return <div>Loading Pets</div>
    }

    return (
        <Fragment>
            <div className="Pets-header">
                <h1 className="Pets-title">My Pets</h1>
                <Link to="/new-pet">
                    <button className="Button Pets-add-button">
                        NEW PET
                    </button>
                </Link>
            </div>
            <div className="Pets-list">
                { pets.length > 0 && pets.map(pet => <PetItem pet={pet} key={pet.id}/>) }
            </div>
        </Fragment>
    );
};

export default PetList;
