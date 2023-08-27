import {
  List,
  ListItem,
  ContactCard,
  ButtonDelete,
} from './ContactList.styled';

export const ContactList = ({ items, onDelete }) => {
  return (
    <List>
      {items.map(({ id, name, number }) => (
        <ListItem key={id}>
          <ContactCard>
            {name}:&nbsp;<span>{number}</span>
            <ButtonDelete type="button" onClick={() => onDelete(id)}>
              Delete
            </ButtonDelete>
          </ContactCard>
        </ListItem>
      ))}
    </List>
  );
};
