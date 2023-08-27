import { ContactForm } from './ContactForm/ContactForm';
import { ContactsBook } from './App.staled';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ButtonReset } from './ContactList/ContactList.styled';

const startContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useLocalStorage(
    'current-contacts',
    startContacts
  );
  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert(`${newContact.name} is already in contacts`)
      : setContacts(ps => [...contacts, newContact]);
  };

  const handleChangeNameFilter = newName => {
    setFilter(newName);
  };

  const resetContacts = () => {
    window.confirm(
      'Are you sure you want to return Contacts to their starting positions?'
    ) && setContacts(startContacts);
  };

  const getVisibleContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const visibleContact = getVisibleContact();

  const deleteContact = contactId => {
    setContacts(ps => ps.filter(contact => contact.id !== contactId));
  };

  return (
    <ContactsBook>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />

      <h2>Contacts</h2>
      <Filter nameFilter={filter} onChange={handleChangeNameFilter} />
      <ButtonReset type="button" onClick={resetContacts}>
        Reset
      </ButtonReset>
      <ContactList items={visibleContact} onDelete={deleteContact} />
    </ContactsBook>
  );
};
