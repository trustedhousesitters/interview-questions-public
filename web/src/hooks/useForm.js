import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_ITEM } from '../constants';
import FormContext from '../contexts/FormContext';
import useImage from './useImage';

const useForm = () => {
  const { imageUrl } = useImage();
  const { form, setForm } = useContext(FormContext);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, type, age, feeds } = form;
    const noSpacesName = name && name.trim();

    // validation, do not dispatch if no name/all spaces/no type, age or feeds
    // add error handling, messages under Form
    if (!name || !noSpacesName || !type || !feeds) {
      setForm({ ...form, name: '', age: '', feeds: '' });
      return;
    }

    dispatch({
      type: ADD_ITEM,
      payload: {
        name: noSpacesName,
        type,
        age,
        feeds,
        imageUrl,
      },
    });
    // reset name after dispatch, dropdown no longer -- select -- so can stay as is
    setForm({ ...form, name: '', age: '', feeds: '' });
  };

  return {
    handleChange,
    handleSubmit,
  };
};

export default useForm;
