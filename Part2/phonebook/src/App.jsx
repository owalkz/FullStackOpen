import { useState, useEffect } from "react";
import axios from "axios";
import contactsService from "./services/Contacts";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [searchString, setSearchString] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageType, setMessageType] = useState("good");
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const exists = persons.find((person) => person.name === newPerson.name);
    if (exists) {
      if (
        window.confirm(
          `${exists.name} is already in the phonebook. Replace the old number with the new one?`
        )
      ) {
        const modifiedContact = { ...exists, number: newPerson.number };
        contactsService
          .updateContact(exists.id, modifiedContact)
          .then((data) => {
            setPersons(
              persons.map((person) => (person.id === exists.id ? data : person))
            );
          })
          .then(() => {
            setErrorMessage(
              `${exists.name}'s number has been successfully updated!`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setMessageType("bad");
            setErrorMessage(error.message);
            setTimeout(() => {
              setErrorMessage(null);
              setMessageType("good");
            }, 3000);
          });
      }
    } else {
      contactsService
        .addContact(newPerson)
        .then((data) => setPersons(persons.concat(data.newPerson)))
        .then(() => {
          setErrorMessage(
            `${newPerson.name} has been successfully added to your contacts.`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        })
        .catch((error) => {
          setMessageType("bad");
          setErrorMessage(error.message);
          setTimeout(() => {
            setErrorMessage(null);
            setMessageType("good");
          }, 3000);
        });
    }
    setNewName("");
    setNewNumber("");
  };
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleSearchStringChange = (e) => {
    setSearchString(e.target.value);
  };
  const deleteNote = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`))
      contactsService
        .deleteContact(id)
        .then((response) => {
          setErrorMessage(
            `${person.name} has been successfully removed from your contacts.`
          );
          setPersons(persons.filter((person) => person.id != id));
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        })
        .catch((error) => {
          setErrorMessage(
            `${person.name} was already removed from your contacts.`
          );
          setMessageType("bad");
          setTimeout(() => {
            setErrorMessage(null);
            setMessageType("good");
          }, 3000);
        });
  };
  const contactsToShow = persons.filter((person) =>
    person.name.toLowerCase().startsWith(searchString.toLowerCase())
  );
  useEffect(() => {
    contactsService.getContacts().then((data) => {
      setPersons(data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={messageType} />
      <Filter value={searchString} onChange={handleSearchStringChange} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {contactsToShow.map((person) => (
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          deleteNote={() => deleteNote(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
