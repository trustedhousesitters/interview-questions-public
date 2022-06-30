import React, { Fragment, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import PetItem from "./components/PetItem";
import { getPets } from "./selectors";
import "./PetList.css";
import Dialog from "../Dialog/Dialog";
import { addPet, deletePet } from "./reducers";
import DialogForm from "../DialogForm";

const PetList = () => {
  const pets = useSelector(getPets);
  const dispatch = useDispatch();
  const [newPetDialogOpen, setNewPetDialogOpen] = useState(false);
  const [petToDelete, setPetToDelete] = useState();

  const handleDelete = useCallback((pet) => {
    setPetToDelete(pet);
  }, []);

  const closeDeleteDialog = () => {
    setPetToDelete(undefined);
  };

  return (
    <Fragment>
      <h1 className="pets-title">My Pets</h1>
      <button
        className="button pets-add"
        onClick={() => setNewPetDialogOpen(true)}
      >
        Add Pet
      </button>
      {pets.length > 0 && (
        <div className="pets-list">
          {pets.map((pet) => (
            <PetItem pet={pet} key={pet.id} onDeleteClicked={handleDelete} />
          ))}
        </div>
      )}

      <Dialog
        open={!!petToDelete}
        title="Delete Pet"
        message={`Are you sure you want to delete ${petToDelete?.name}?`}
        actions={[
          { label: "Cancel", onClick: closeDeleteDialog },
          {
            label: "Confirm",
            onClick: async () => {
              const actionResult = await dispatch(deletePet(petToDelete.id));

              if (deletePet.rejected.match(actionResult)) {
                // NOTE: Traditionally you would display a error message to the user via a snackbar
                alert(`Unable to delete ${petToDelete.name}`);
              }

              closeDeleteDialog();
            },
          },
        ]}
      />

      <DialogForm
        open={newPetDialogOpen}
        title={"Add Pet"}
        handleSubmit={async (e) => {
          e.preventDefault();
          const form = e.target;
          const formData = new FormData(form);
          const newPet = Object.fromEntries(formData);
          const actionResult = await dispatch(addPet(newPet));

          if (addPet.rejected.match(actionResult)) {
            // NOTE: Traditionally you would display a error message to the user via a snackbar
            alert(`Unable to create ${newPet.name}`);
          }

          if (addPet.fulfilled.match(actionResult)) {
            setNewPetDialogOpen(false);
            form.reset();
          }
        }}
        handleCancel={() => setNewPetDialogOpen(false)}
      >
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="type">Animal type:</label>
          <input type="text" name="type" id="type" />
        </div>
        <div className="form-group">
          <label htmlFor="feeds">Number of feeds:</label>
          <input
            type="number"
            name="feeds"
            min="0"
            id="feeds"
            defaultValue={0}
          />
        </div>
      </DialogForm>
    </Fragment>
  );
};

export default PetList;
