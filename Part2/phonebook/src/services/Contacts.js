import axios from "axios";
const baseUrl = "/api/persons";

const getContacts = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch(() => {
      alert("An error occurred while fetching contacts.");
    });
};

const addContact = (newContact) => {
  return axios
    .post(baseUrl, newContact)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error?.response?.data?.error);
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
      throw new Error(error?.response?.data?.error);
    });
};

export default { getContacts, addContact, deleteContact, updateContact };
