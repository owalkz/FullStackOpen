import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getContacts = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((error) => {
      alert("An error occurred while fetching contacts.");
    });
};

const addContact = (newContact) => {
  return axios
    .post(baseUrl, newContact)
    .then((response) => response.data)
    .catch((error) => {
      alert("Failed to add contact");
    });
};

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.status);
};

const updateContact = (id, modifiedContact) => {
  return axios
    .put(`${baseUrl}/${id}`, modifiedContact)
    .then((response) => response.data)
    .catch((error) => {
      alert("Failed to update contact");
    });
};

export default { getContacts, addContact, deleteContact, updateContact };
