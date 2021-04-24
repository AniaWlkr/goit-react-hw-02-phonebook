import React, { Component } from 'react';
import styles from './App.module.css';
import { v4 } from 'uuid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  handleChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.contacts.find(contact => contact.name === this.state.name)) {
      alert(`${this.state.name} is already in contact`);
      return null;
    }
    const newContact = {
      id: v4(),
      name: this.state.name,
      number: this.state.number,
    };
    this.setState(({ contacts }) => ({ contacts: [newContact, ...contacts] }));
    this.setState({ name: '' });
    this.setState({ number: '' });
  };

  handleDelete = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.includes(this.state.filter),
    );

    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Phone number
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
              value={this.state.number}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Add contact</button>
        </form>
        <h2>Contacts</h2>
        <label>
          Find contacts by name
          <input
            type="text"
            name="filter"
            value={this.state.filter}
            onChange={this.handleChange}
          />
        </label>
        {this.state.contacts.length ? (
          <ul>
            {filteredContacts.map(contact => (
              <li key={contact.id}>
                {contact.name}: {contact.number}
                <button
                  type="button"
                  onClick={() => this.handleDelete(contact.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Phonebook is empty</p>
        )}
      </div>
    );
  }
}

export default App;
