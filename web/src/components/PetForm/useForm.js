import { useState } from "react";

const useForm = (initialState = {}) => {
    
    const [data, setData] = useState(initialState)
    const [isSaving, setIsSaving] = useState(false)

    const handleChange = (e) => {
        const {name:field, value} = e.target
        setData({...data, [field]: value})
    }
    
    const handleSubmit = (event, action) => {
        setIsSaving(true)
        event.preventDefault()
        setData(initialState)
        action()
    }

    return [data, handleChange, handleSubmit, isSaving]
    
};

export default useForm;
