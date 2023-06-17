const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contacts);
};

async function getContactById(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    console.log(contacts[index] || null);
    return contacts[index] || null;
};

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) return null;
    const removeContact = contacts[index];
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(removeContact);
    return removeContact;
}

function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту. 
}

// removeContact('qdggE76Jtbfd9eWJHrssH11')
