import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Formik } from 'formik';
import {addPet} from "./actions";
import { getPets } from './selectors';
import close from './assets/close.svg';
import './AddPet.css';

const AddPet = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pets = useSelector(getPets);
    const dispatch = useDispatch();

    return(
            <Formik
                initialValues={{
                    id: pets.length + 1,
                    name: '',
                    type: '',
                    age: '',
                    feeds: '',
                }}
                validate={values => {
                    const errors = {};
                    if(!values.name){
                        errors.name= "You must insert a name";
                    }
                    return errors;
                }}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    dispatch(addPet(values))
                    setSubmitting(false);
                    setIsOpen(false);
                    resetForm();
                }}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    resetForm
                    /* and other goodies */
                }) => (
                    <form className="add-pet-form" onSubmit={handleSubmit}>

                    <button 
                        className="add-pet-button"
                        onClick={() => setIsOpen(true)}>Add Pet</button>
                    {isOpen &&
                        <div class="add-pet-modal" style={{display: isOpen ? 'block' : 'none'}}>
                            <div class="modal-content">
                                <button 
                                className="close-modal-button"
                                onClick={() => {
                                    resetForm();
                                    setIsOpen(false);
                                }}>
                                    <img src={close} className="Delete-icon" alt="delete" />
                                </button>
                            <p>Add a pet</p>
                            <div className="modal-content-form">
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    placeholder="Enter your pet's name"
                                    className="form-field"
                                />
                                <span>{errors.name && touched.name && errors.name}</span>
                                <input
                                    type="number"
                                    name="age"
                                    min={0}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.age}
                                    placeholder='age'
                                    className="form-field"
                                />
                                <select
                                    name="type"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.type}
                                    className="form-field"
                                >
                                    <option value="">Choose an Animal</option>
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                    <option value="Antelope">Antelope</option>
                                    <option value="WildBoar">Wild Boar</option>
                                    <option value="Rock">Rock</option>
                                </select>
                                <input
                                    type="number"
                                    name="feeds"
                                    min={0}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.feeds}
                                    placeholder='feeds'
                                    className="form-field"
                                />
                            </div>
                            <button className="add-pet-submit" type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                            </div>
                        </div>
                        }
                    </form>
                )}
                </Formik>
    );
};
export default AddPet;