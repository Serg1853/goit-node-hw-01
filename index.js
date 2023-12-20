const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;
    case "get":
      const oneContact = await contacts.getContactById(id);
      console.table(oneContact);
      break;
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.table(newContact);
      break;
    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.table(deleteContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// invokeAction({ action: "read" });
// invokeAction({ action: "readById", contactId: "05olLMgyVQdWRwgKfg5J6" });
// invokeAction({
//   action: "add",
//   name: "Buba",
//   email: "tets@test.com",
//   phone: "123456789",
// });
// invokeAction({ action: "deleteById", contactId: "EcvsVFNMHbBUP-KEClxzV" });
invokeAction(argv);
