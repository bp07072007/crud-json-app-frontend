import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

import "../assets/styles/AddEdit.css";
import { toast } from "react-toastify";

import {
  LoadDataSingleEdit,
  AddNewContactAction,
  EditContactAction,
} from "../utils/ActionUtility.js";
import { initialState } from "../utils/InitialState.js";

// Component for Add edit the contact

const AddEdit = () => {
  // Define the useSate
  const [state, setState] = useState(initialState);
  const { cname, email, contact } = state;
  const [visibility, setvisibility] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  // Function for setting the partucular contact detail
  const DataSingleEdit = async (id) => {
    if (id) {
      const response = await LoadDataSingleEdit(id);
      setState(response);
    }
  };

  // Fetch the information of particular ID contact
  useEffect(() => {
    DataSingleEdit(id);
  }, [id]);

  // Add the contact information after submitting below
  const handleSubmit = async (e) => {
    e.preventDefault();
    setvisibility(true);
    if (!cname || !email || !contact) {
      toast.error("Please provide value into each input field", {
        position: toast.POSITION.TOP_RIGHT
    });
    setvisibility(false);
    } else {
      if (!id) {
        // API for adding the contact information into database
        const response = await AddNewContactAction(cname, email, contact);
        if (response === "success") {
          setState(initialState);
          setvisibility(false);
        }
      } else {
        // API fro Updating the contact information into database

        const response = await EditContactAction(id, cname, email, contact);
        if (response === "success") {
          setState(initialState);
          setvisibility(false);
        }
      }

      // After submission the URL redirect to listing contact page
      setTimeout(() => navigate("/"), 500);
    }
  };

  // to change the status of the contact
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <h2>{id ? "Edit Contact Detail" : "Add Contact Detail"}</h2>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="cname"
          name="cname"
          placeholder="Your Name"
          value={cname || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="Your Contact No ..."
          value={contact || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />

        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>

      <ColorRing
        visible={visibility}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#429EA6"]}
      />
    </div>
  );
};

export default AddEdit;
