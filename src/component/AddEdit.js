
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";


import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";


import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";


import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";


import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";





import "./styles/AddEdit.css";
import { toast } from "react-toastify";

import {

  LoadDataSingleEdit,
  AddNewContactAction,
  EditContactAction,


  LoadDataSingleEdit,
  AddNewContactAction,
  EditContactAction,


  LoadDataSingleEdit,
  AddNewContactAction,
  EditContactAction,


  LoadDataSingleEdit,
  AddNewContactAction,
  EditContactAction,


  LoadDataSingleEdit,
  AddNewContactAction,
  EditContactAction,

  
  AddNewContactAction,
  





} from "../utils/ActionUtility.js";
import { initialState } from "../utils/InitialState.js";

// intialised the field value

const AddEdit = () => {
  // Define the useSate
  const [state, setState] = useState(initialState);
  const { cname, email, contact } = state;
  const navigate = useNavigate();


  const { id } = useParams();

  // Function for setting the partucular contact detail
  const DataSingleEdit = async (id) => {
    const response = await LoadDataSingleEdit(id);
    setState(response);
  };

  // Fetch the information of particular ID contact
  useEffect(() => {
    DataSingleEdit(id);
  }, [id]);


  // Add the contact information after submitting below

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cname || !email || !contact) {
      toast.error("Please provide value into each input field");
    } else {

      if (!id) {
        // API for adding the contact information into database
        AddNewContactAction(cname, email, contact);
        setState(initialState);
      } else {
        // API fro Updating the contact information into database

        EditContactAction(id, cname, email, contact);
        setState(initialState);
      }





      
        // API for adding the contact information into database
        AddNewContactAction(cname, email, contact);
        setState(initialState);
      





      // After submission the URL redirect to listing contact page
      setTimeout(() => navigate("/"), 50);
    }
  };

  // to change the status of the contact
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "50px" }}>
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
          type="number"
          id="contact"
          name="contact"
          placeholder="Your Contact No ..."
          value={contact || ""}
          onChange={handleInputChange}

        />
        <input type="submit" value={id ? "Update" : "Save"} />


        <input type="submit" value={id ? "Update" : "Save"} />


        <input type="submit" value={id ? "Update" : "Save"} />


        <input type="submit" value={id ? "Update" : "Save"} />


        <input type="submit" value={id ? "Update" : "Save"} />

        <input type="submit" value={"Save"} />





        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
