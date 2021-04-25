import React, { Component } from 'react';
// import { v4 } from 'uuid';
import styles from './App.module.css';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  addContact = newContact => {
    if (this.state.contacts.find(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contact`);
      return null;
    }

    this.setState(({ contacts }) => ({ contacts: [newContact, ...contacts] }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .includes(this.state.filter.toLocaleLowerCase()),
    );

    return (
      <div className={styles.container}>
        <h1 className={styles.headTitle}>Phonebook</h1>
        <ContactForm handleSubmit={this.addContact} />
        <h2 className={styles.title}>Contacts</h2>
        <ContactList
          value={this.state.filter}
          contacts={filteredContacts}
          handleChange={this.handleChange}
          handleDelete={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
