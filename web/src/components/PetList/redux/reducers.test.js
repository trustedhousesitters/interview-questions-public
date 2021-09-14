import petsReducer from './reducers'
import { DELETE_PET } from "./types";

describe('pets reducer', () => {
    it('should return items in the initial state', () => {
        const returnedState = petsReducer(undefined, { type: 'not set'})
        expect(returnedState.pets).toBeInstanceOf(Array)
        expect(returnedState.pets.length).toEqual(13)
    })

    it('should delete a pet', () => {
        const initialState = {
            pets: [
                {
                    id: 223,
                    name: 'flash',
                    type: 'dog',
                    age: 12,
                    feeds: 3
                }
            ]
        }

        const returnedState = petsReducer(initialState, { type: DELETE_PET, payload: { id: 223 }})
        expect(returnedState.pets).toBeInstanceOf(Array)
        expect(returnedState.pets.length).toEqual(0)
    })

    it('should delete nothing if no id matches', () => {
        const initialState = {
            pets: [
                {
                    id: 223,
                    name: 'flash',
                    type: 'dog',
                    age: 12,
                    feeds: 3
                }
            ]
        }

        const returnedState = petsReducer(initialState, { type: DELETE_PET, payload: { id: 224 }})
        expect(returnedState.pets).toBeInstanceOf(Array)
        expect(returnedState.pets.length).toEqual(1)
    })
})