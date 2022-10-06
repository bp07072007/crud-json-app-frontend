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

  // Function for information of List of contact
  const loadData = async () => {
    const response = await ContactDataList();
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

  let LoopData = "";

  LoopData = data;

  return (
    <div style={{ marginTop: "50px" }}>
      <Link to="/addcontact">
        <button
          className="btn btn-contact"
          style={{ float: "left", marginLeft: "16%" }}
        >
          Add Contact
        </button>
      </Link>
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
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
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
