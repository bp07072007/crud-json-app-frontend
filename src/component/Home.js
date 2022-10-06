import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css";

import {
  ContactDataList,
  DeleteContactRecord,

  ChangeStatusUtility,



} from "../utils/ActionUtility.js";

const Home = () => {
  // Define the useSate

  const [data, setData] = useState([]);
  const [status, setStatus] = useState("2");

  // Function for information of List of contact
  const loadData = async () => {
    const response = await ContactDataList();
    console.log(response);
    setData(response.data.data.Contact);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Deleting the contact from database

  const deleteContact = (id) => {
    if (window.confirm("Are you sure to delete the contact ?")) {
      DeleteContactRecord(id);
      setTimeout(() => loadData(), 500);
    }
  };

  // Method for change the status

  const changeStatus = (id, sendStatus) => {
    ChangeStatusUtility(id, sendStatus);
    setTimeout(() => loadData(), 50);
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };


  let LoopData = "";
  if (status) {
    if (parseInt(status) === 2) {
      LoopData = data;
    } else if (parseInt(status) === 0) {
      LoopData = data.filter((item) => parseInt(item.cstatus) === 0);
    } else if (parseInt(status) === 1) {
      LoopData = data.filter((item) => parseInt(item.cstatus) === 1);
    }
  } else {
    LoopData = data;
  }

  return (
    <div style={{ marginTop: "50px" }}>
      <Link to="/addcontact">
        <button
          className="btn btn-contact"

          style={{ float: "left", marginLeft: "21%" }}       >
          Add Contact
        </button>
      </Link>

      <label htmlFor="changestatusFilter">Status Filter</label>
      <select
        id="changestatusFilter"
        style={{ width: "12%" }}
        onChange={handleChangeStatus}
      >
        <option value="2">All</option>
        <option value="0">Not Completed</option>
        <option value="1">Completed</option>
      </select>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>status</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {LoopData.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.cname}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>{item.cstatus === 0 ? "Not Completed" : "Completed"}</td>
                <td>
                  {!item.cstatus ?  
                   <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link> : 
                    <button className="btn btn-disable" disabled>Edit</button>
                  }
                 

                  <button
                    className="btn btn-delete"
                    onClick={() => deleteContact(item.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="btn btn-edit"
                    onClick={() => changeStatus(item.id, item.cstatus)}
                  >
                    Change Status
                  </button>

                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>


                 


                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
