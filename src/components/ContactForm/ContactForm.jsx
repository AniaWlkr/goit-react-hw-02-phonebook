import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const newContact = {
      id: v4(),
      name: this.state.name,
      number: this.state.number,
    };

    this.props.handleSubmit(newContact);
    this.setState({ name: '' });
    this.setState({ number: '' });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
              value={this.state.name}
              onChange={this.handleChange}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Phone number
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
              value={this.state.number}
              onChange={this.handleChange}
              className={styles.input}
            />
          </label>
          <button type="submit" className={styles.button}>
            Add contact ✅
          </button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
