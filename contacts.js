const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts(isLog = false) {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    if (isLog) console.log(JSON.parse(contacts));
    return JSON.parse(contacts);
  } catch (er) {
    console.log(er.message);
  }
};

async function getContactById(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  console.log(contacts[index] || null);
};

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    console.log(null);
    return;
  };
  const removeContact = contacts[index];
  contacts.splice(index, 1);
  
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(removeContact);
  } catch (er) {
    console.log(er.message);
  }
};

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(newContact);
  } catch (er) {
    console.log(er.message);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };