import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PetItem from './components/PetItem';
import { getPets } from './selectors';
import { Link } from 'react-router-dom';
import { fetchDogPicture } from '../../api/fetchDogPicture';
import { addImages } from './actions';
import './PetList.css';


const PetList = () => {
    const pets = useSelector(getPets);
    const dispatch = useDispatch()
    const [isLoading, setIsloading] = useState(false)

    
    useEffect(()=>{
        setIsloading(true)

        if(!pets[0]?.imageUrl && pets.length>0){
                const createPromises = (length) => {
                const promiseArray = []
                for(let i = 0; i < length; i += 1) {
                    promiseArray.push(fetchDogPicture())
                }
                return promiseArray
            }

            const nPromises = createPromises(pets.length)
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
    },[dispatch, pets])

    if(isLoading){
        return <h1>Loading Pets</h1>
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
