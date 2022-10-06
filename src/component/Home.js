import React, { useState, useEffect } from "react";

import "./styles/Home.css";

import { ContactDataList } from "../utils/ActionUtility.js";

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

  let LoopData = "";

  LoopData = data;

  return (
    <div style={{ marginTop: "50px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>status</th>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
