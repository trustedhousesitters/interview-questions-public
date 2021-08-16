import { useState, useEffect, useContext } from 'react';
import { BASE_URL } from '../constants';
import FormContext from '../contexts/FormContext';

const useImage = () => {
  const [imageUrl, setImageUrl] = useState();
  const { form } = useContext(FormContext);

  useEffect(() => {
    fetchImage();
  }, [form]);

  const fetchImage = async () => {
    const imageName = await fetch(`${BASE_URL}/woof?include=jpg`);
    const imageUrl = await imageName.text();
    setImageUrl(`${BASE_URL}/${imageUrl}`);
  };

  return {
    imageUrl,
  };
};

export default useImage;
