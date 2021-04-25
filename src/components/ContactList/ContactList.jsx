import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

const ContactList = ({ value, contacts, handleChange, handleDelete }) => {
  return (
    <div className={styles.section}>
      <label className={styles.label}>
        Find contacts by name 🔎
        <input
          className={styles.input}
          type="text"
          name="filter"
          value={value}
          onChange={handleChange}
        />
      </label>
      {contacts.length ? (
        <ul className={styles.list}>
          {contacts.map(contact => (
            <li key={contact.id} className={styles.item}>
              {contact.name}: {contact.number}
              <button
                type="button"
                onClick={() => handleDelete(contact.id)}
                className={styles.button}
              >
                Delete ❌
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.notification}>😔 No name in Phonebook</p>
      )}
    </div>
  );
};

ContactList.propTypes = {
  value: PropTypes.string,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
  handleChange: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default ContactList;
