// Demo.js
import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"; // Asegúrate de importar Link desde react-router-dom

export const Demo = () => {
  const { actions } = useContext(Context);
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "", address: "" });

  const handleInputChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleAddContact = async () => {
    await actions.addContact(newContact);
    setNewContact({ name: "", email: "", phone: "", address: "" });
  };

  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" name="name" value={newContact.name} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="email" name="email" value={newContact.email} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input type="tel" className="form-control" id="phone" name="phone" value={newContact.phone} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input type="text" className="form-control" id="address" name="address" value={newContact.address} onChange={handleInputChange} />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddContact}>
          Add Contact
        </button>
      </form>

      <div className="mt-3">
        <Link to="/" className="btn btn-secondary">Or get back to contacts</Link>
      </div>
    </div>
  );
};
