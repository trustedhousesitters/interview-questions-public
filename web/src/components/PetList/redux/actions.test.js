import { deletePetById } from './actions';
import { DELETE_PET } from "./types";

describe('pet actions', () => {
    it('should present a fully formed dellete action', () => {
        expect(deletePetById(234)).toStrictEqual({
            type: DELETE_PET,
            payload: {
                id: 234
            }
        })
    })
})