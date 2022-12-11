const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(result);
  return contacts;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  let arr = [];
  arr = contacts.map((contact) => arr.push(contact.id));
  newId = Math.max(...arr) + 1;

  const newContact = {
    id: String(newId),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
