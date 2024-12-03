const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@ route GET /api/contacts
//@access Public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc Create New contact
//@ route POST /api/contacts
//@access Public

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

//@desc Get contact
//@ route GET /api/contacts/:id
//@access Public

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log("getContact", contact);
  if (!contact || contact === null || contact === undefined) {
    res.status(403);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Update contact
//@ route PUT /api/contacts/:id
//@access Public

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log("getContact", contact);
  if (!contact) {
    res.status(403);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete contact
//@ route DELETE /api/contacts/:id
//@access Public

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Contact for ${req.param.id}` });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
