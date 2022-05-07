import React, { Fragment } from 'react';

import './PetForm.css';
import { useNavigate } from 'react-router-dom';
import TextField from './TextField';
import useForm from './useForm';
import { useSelector } from 'react-redux';
import { getPets } from '../PetList/selectors';
import { generateNewId } from '../../helpers/generateNewId';

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

    const [pet, handleChange, handleSubmit] = useForm(initialValues)

    const goBack = () => {
        return navigate("/")
    }

    const onSubmit = (e) => {
        const id = generateNewId(pets)
        handleSubmit(e, id)
        return navigate("/")
    }
    
    return (
        <Fragment>
            <div className="Pet-form-header">
                <h1 className="Pets-title">New Pet</h1>
            </div>
            <div className="Pet-form">
            <form onSubmit={onSubmit}>
                {INPUTS.map((input, index)=>{
                    return <TextField key={index} input={input} value={pet[input.field]} handleChange={handleChange} />
                })}
            <div className="Pet-form-buttons">
                <button className="Button Cancel-button" onClick={goBack}>
                    CANCEL
                </button>
                <button type="submit" className="Button Save-button">
                    SAVE
                </button>
            </div>
            </form>
        </div>
        </Fragment>
    );
};

export default PetForm;
