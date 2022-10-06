import axios from "axios";
import { toast } from "react-toastify";

// Function for information of List of contact

export const ContactDataList = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_PATH}/api/get`
  );

  return response;
};

// API for adding the contact information into database

export const AddNewContactAction = async (cname, email, contact) => {
  await axios
    .post(`${process.env.REACT_APP_SERVER_PATH}/api/post`, {
      cname,
      email,
      contact,
    })
    .then(() => {})
    .catch((err) => toast.error(err.response.data));
  toast.success("Contact added successfully");
};
