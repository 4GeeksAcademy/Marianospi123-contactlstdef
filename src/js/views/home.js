// home.js
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass, faMobileAlt, faEnvelope, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    actions.loadSomeData();
  }, []);

  const handleGetContactsFromAgenda = async (agenda_slug) => {
    const contacts = await actions.getContactsFromAgenda(agenda_slug);
    console.log(`Contacts from Agenda ${agenda_slug}:`, contacts);
  };

  const handleGetOneContact = async (contact_id) => {
    try {
      const contact = await actions.getOneContact(contact_id);
      console.log("One Contact:", contact);
      setSelectedContact(contact);
      setIsEditing(true);
    } catch (error) {
      console.error("Error fetching one contact:", error);
    }
  };

  const handleDeleteOneContact = async (contact_id) => {
    await actions.deleteOneContact(contact_id);
    actions.loadSomeData();
    setSelectedContact(null); 
    setIsEditing(false); 
  };
  

  const handleUpdateContact = async () => {
   
    try {
      await actions.updateContact(selectedContact.id, selectedContact);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  return (
    <div className="contact-list-container">
      {store.contacts.map((contact) => (
        <div key={contact.id} className="contact-rectangle">
          <div className="contact-image-container">
            <img src={"https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg"} alt="Contact" className="contact-image" />
          </div>
          <div className="contact-details">
            <h3 style={{ marginLeft: "10px" }}>{contact.name}</h3>
            <p>
              <FontAwesomeIcon icon={faCompass} style={{ marginRight: "5px" }} />
              <strong>Address:</strong> {contact.address}
            </p>
            <p>
              <FontAwesomeIcon icon={faMobileAlt} style={{ marginRight: "5px" }} />
              <strong>Phone:</strong> {contact.phone}
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "5px" }} />
              <strong>Email:</strong> {contact.email}
            </p>
          </div>
          <div className="contact-actions">
            <button type="button" className="btn btn-danger" onClick={() => handleDeleteOneContact(contact.id)}>
              <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} />
              Delete
            </button>
            <button type="button" className="btn btn-info" onClick={() => handleGetOneContact(contact.id)}>
              <FontAwesomeIcon icon={faPen} style={{ marginRight: "5px" }} />
              Get One
            </button>
          </div>
        </div>
      ))}

      {isEditing && selectedContact && (
        <div className="edit-form">
          <h3>Edit Contact</h3>
          <form>
            <button type="button" onClick={handleUpdateContact}>
              Update Contact
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
