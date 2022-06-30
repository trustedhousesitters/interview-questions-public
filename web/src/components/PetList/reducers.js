import { generatePets } from "../../helpers/generatePets";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createPet } from "../../services/pet-service";

export const deletePet = createAsyncThunk(
  "app/deletePet",
  async (id, thunkAPI) => {
    // NOTE: Traditionally you would call a service here to delete the pet from the BE
    const pets = [...thunkAPI.getState().pets.petsList];
    const removeIndex = pets.findIndex((p) => p.id === id);

    if (removeIndex === -1) {
      throw new Error(`Unable to delete pet id: ${id}`);
    }

    pets.splice(removeIndex, 1);
    return pets;
  }
);

export const addPet = createAsyncThunk("app/addPet", async (pet, thunkAPI) => {
  const petsList = thunkAPI.getState().pets.petsList;
  const newPet = await createPet(pet);
  const pets = [newPet, ...petsList];
  return pets;
});

export const petSlice = createSlice({
  name: "pets",
  initialState: {
    petsList: generatePets(13),
    updating: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deletePet.pending, (state) => {
        state.updating = true;
      })
      .addCase(deletePet.rejected, (state) => {
        state.updating = false;
      })
      .addCase(deletePet.fulfilled, (state, { payload }) => {
        state.petsList = payload;
        state.updating = false;
      })
      .addCase(addPet.pending, (state) => {
        state.updating = true;
      })
      .addCase(addPet.rejected, (state) => {
        state.updating = false;
      })
      .addCase(addPet.fulfilled, (state, { payload }) => {
        state.petsList = payload;
        state.updating = false;
      });
  },
});

// Action creators are generated for each case reducer function
//export const { } = petSlice.actions

export default petSlice.reducer;
