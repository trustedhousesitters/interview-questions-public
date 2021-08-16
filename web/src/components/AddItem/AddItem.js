import React, { useContext } from 'react';
import useForm from '../../hooks/useForm';
import { PET_TYPES } from '../../constants';
import FormContext from '../../contexts/FormContext';
import './AddItem.css';

const AddItem = () => {
  const { form } = useContext(FormContext);
  const { handleChange, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit} className="AddItem-form">
      <div className="AddItem-labelDataGroup">
        <label htmlFor="type" className="AddItem-label">
          Type:{' '}
        </label>
        <select
          defaultValue=""
          name="type"
          onChange={handleChange}
          className="AddItem-select"
        >
          <option disabled hidden value="">
            -- select --
          </option>
          {PET_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="AddItem-labelDataGroup">
        <label htmlFor="name" className="AddItem-label">
          Name:{' '}
        </label>

        <input
          id="name"
          name="name"
          onChange={handleChange}
          className="AddItem-input"
          type="text"
          value={form && form.name}
        />
      </div>

      <div className="AddItem-labelDataGroup">
        <label htmlFor="age" className="AddItem-label">
          Age:{' '}
        </label>

        <input
          id="age"
          max={99}
          min={0}
          name="age"
          onChange={handleChange}
          className="AddItem-input"
          type="number"
          value={form && form.age}
        />
      </div>

      <div className="AddItem-labelDataGroup">
        <label htmlFor="name" className="AddItem-label">
          Feeds:{' '}
        </label>

        <input
          id="feeds"
          max={99}
          min={0}
          name="feeds"
          onChange={handleChange}
          className="AddItem-input"
          type="number"
          value={form && form.feeds}
        />
      </div>

      <input className="AddItem-button" type="submit" value="Add a Pet"></input>
    </form>
  );
};

export default AddItem;
