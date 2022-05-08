import React, { Fragment } from 'react';

import { useNavigate } from 'react-router-dom';
import TextField from './components/TextField';
import useForm from './useForm';
import { useDispatch, useSelector } from 'react-redux';
import { getPets } from '../PetList/selectors';
import { generateNewId } from '../../helpers/generateNewId';
import { addPet } from '../PetList/actions';
import { fetchDogPicture } from '../../api/fetchDogPicture';
import './PetForm.css';

export const ADD_PET_TEST_ID = "add-pet-id"

const INPUTS = [
    {   
        label: "Name",
        field: "name",
        type: "text",
        required: true
    },
    {
        label: "Type",
        field: "type",
        type: "text",
        required: false
    },
    {
        label: "Number of feeds",
        field: "feeds",
        type: "number",
        required: false
    },
    {
        label: "Age",
        field: "age",
        type: "number",
        required: false
    }

]

const initialValues = {
    name: "",
    type: "",
    feeds: 0,
    age: 0
}

const PetForm = () => {
    const pets = useSelector(getPets);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [pet, handleChange, handleSubmit, isSaving] = useForm(initialValues)

    const goBack = () => {
        return navigate("/")
    }

    const onSubmit = async () => {
        const id = generateNewId(pets)
        const imageUrl = await fetchDogPicture()
        dispatch(addPet({id, imageUrl , ...pet}))
        return navigate("/")
    }
    
    if(isSaving){
       return  <h1>Saving</h1>
    }

    return (
        <Fragment>
            <div className="Pet-form-header">
                <h1 className="Pets-title">New Pet</h1>
            </div>
            <div className="Pet-form">
            <form onSubmit={(event) => handleSubmit(event,onSubmit)}>
                {INPUTS.map((input, index)=>{
                    return <TextField key={index} input={input} value={pet[input.field]} handleChange={handleChange} />
                })}
            <div className="Pet-form-buttons">
                <button type="button" className="Button Cancel-button" onClick={goBack}>
                    CANCEL
                </button>
                <button data-testid={ADD_PET_TEST_ID} type="submit" className="Button Save-button">
                    SAVE
                </button>
            </div>
            </form>
        </div>
        </Fragment>
    );
};

export default PetForm;
