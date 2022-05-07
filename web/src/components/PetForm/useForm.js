import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPet } from "../PetList/actions";

const useForm = (initialState = {}) => {
    
    const dispatch = useDispatch()
    const [data, setData] = useState(initialState)

    const handleChange = (e) => {
        const {name:field, value} = e.target
        setData({...data, [field]: value})
    }
    
    const handleSubmit = (e, id) => {
        e.preventDefault();
        dispatch(addPet({id, ...data}))
        setData(initialState)
    }

    return [data, handleChange, handleSubmit]
    
};

export default useForm;
