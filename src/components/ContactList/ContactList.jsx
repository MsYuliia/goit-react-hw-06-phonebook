import { useSelector } from 'react-redux';
import { getFilterValue, getContacts } from '../redux/selectors';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'components/redux/contactsSlice';
import css from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();

  const getVisibleContacts = (filterValue, contacts) => {
    if (contacts.length === 0) {
      return 0;
    }
    const normalizeFilter = filterValue.toLowerCase();
    const filterContact = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
    return filterContact;
  };

  const filterValue = useSelector(getFilterValue);
  const contacts = useSelector(getContacts);
  const visibleContacts = getVisibleContacts(filterValue, contacts);

  const hundleContact = contactId => dispatch(deleteContact(contactId));

  return (
    <div>
      {visibleContacts.length > 0 && (
        <ul className={css.contactList}>
          {visibleContacts.map(contact => {
            return (
              <li className={css.contactItem} key={contact.id}>
                <p className={css.contactText}>
                  {contact.name}: {contact.number}
                </p>
                <button
                  className={css.contactButton}
                  type="button"
                  onClick={() => {
                    hundleContact(contact.id);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
