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
    .then(() => {
      toast.success("Contact added successfully", {
        position: toast.POSITION.TOP_RIGHT
    });
      return "success";
    })
    .catch((err) => toast.error(err.response.data));
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
    .then(() => {
      toast.success("Contact updated successfully", {
        position: toast.POSITION.TOP_RIGHT
    });
      return "success";
    })
    .catch((err) => toast.error(err.response.data), {
      position: toast.POSITION.TOP_RIGHT
  });
 
};

// Fetch the information of particular ID contact

export const LoadDataSingleEdit = async (id) => {
  const resp = await axios.get(
    `${process.env.REACT_APP_SERVER_PATH}/api/singleget/${id}`
  );

  return resp.data.data;
};

// Deleting the contact from database

export async function DeleteContactRecord  (id){
  const response = await axios.delete(`${process.env.REACT_APP_SERVER_PATH}/api/delete/${id}`);
  if (response.statusText === "OK") {
    toast.success("Contact deleted succesfully", {
      position: toast.POSITION.TOP_RIGHT
  });
  } else {
    toast.success("Contact not deleted", {
      position: toast.POSITION.TOP_RIGHT
  });
  }
  return response
};

// Method for change the status

export const ChangeStatusUtility = (id, sendStatus) => {
  axios
    .put(`${process.env.REACT_APP_SERVER_PATH}/api/update/status`, {
      sendStatus,
      id,
    })
    .then(() => {
      toast.success("Contact status updated successfully", {
        position: toast.POSITION.TOP_RIGHT
    });
    })
    .catch((err) => toast.error(err.response.data));
};

// Function for information of List of contact

export const LoadDataSingleContact = async (id) => {
  const resp = await axios.get(
    `${process.env.REACT_APP_SERVER_PATH}/api/view/${id}`
  );

  return resp.data.data.Contact;
};
