import { useState } from "react";

const useForm = (initialState = {}) => {
    
    const [data, setData] = useState(initialState)

    const handleChange = (e) => {
        const {name:field, value} = e.target
        setData({...data, [field]: value})
    }
    
    const handleSubmit = () => {
        setData(initialState)
    }

    return [data, handleChange, handleSubmit]
    
};

export default useForm;
