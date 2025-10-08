import React, { useEffect, useState } from "react";
import "./PetList.css";
import PetCarousel from "./components/PetCarousel/PetCarousel";
import {useQuery} from '@tanstack/react-query'

const PetList = () => {

  // ***************************************************
  // react-query
  // ***************************************************
  // This is working on the client but required too 
  // much configurations on the testing side expecting MSW 
  // for simplicity i reverted to a basic useEffect/fetch solution
  // Using react query to handle cache, error, loading etc
  // potentially this can be abstracted into a utility
  // if this api call is common across the site
  // const {data: pets, isLoading, error} = useQuery({
  //   queryKey: ['pets'],
  //   queryFn: async () => {
  //     const res = await fetch('/api/pets/')
  //     if(!res.ok){
  //       throw new Error(`HTTP error ${res.status}`)
  //     }
  //     return res.json()
  //   }
  // })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pets, setPets] = useState(null)

  useEffect( () => {
    const fetchingPets = async () => {
      try {
        setIsLoading(true)
        const res = await fetch('/api/pets/', {cache: 'no-store'})
        
        if(!res.ok){
          throw new Error(`HTTP ERROR ${res.status}`)
        }
        const pets = await res.json()
        setPets(pets)
        setIsLoading(false)

      } catch (error) {
        setIsLoading(false)
        setError(error.message)
      }
    }
    fetchingPets()
  }, [])

  if(isLoading){
    return <>... Loading</>
  }

  if(error){
    return <>{error.message}</>
  }

  return (
    <>
      {!pets ? null : <PetCarousel pets={pets}  />}
    </>
  );
};

export default PetList;
