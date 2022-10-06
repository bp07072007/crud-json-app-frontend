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


// API fro Updating the contact information into database

export const EditContactAction = async (id, cname, email, contact) => {
  await axios
    .put(`${process.env.REACT_APP_SERVER_PATH}/api/update`, {
      id,
      cname,
      email,
      contact,
    })
    .then(() => {})
    .catch((err) => toast.error(err.response.data));
  toast.success("Contact updated successfully");
};

// Fetch the information of particular ID contact

export const LoadDataSingleEdit = async (id) => {
  const resp = await axios.get(
    `${process.env.REACT_APP_SERVER_PATH}/api/singleget/${id}`
  );

  return resp.data.data;
};


// Deleting the contact from database

export const DeleteContactRecord = (id) => {
  axios.delete(`${process.env.REACT_APP_SERVER_PATH}/api/delete/${id}`);
  toast.success("Contact deleted succesfully");
};


// Method for change the status

export const ChangeStatusUtility = (id, sendStatus) => {
  axios
    .put(`${process.env.REACT_APP_SERVER_PATH}/api/update/status`, {
      sendStatus,
      id,
    })
    .then(() => {
      toast.success("Contact status updated successfully");
    })
    .catch((err) => toast.error(err.response.data));
};




