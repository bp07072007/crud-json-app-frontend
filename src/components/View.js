import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import "../assets/styles/View.css";
import { LoadDataSingleContact } from "../utils/ActionUtility.js";

const View = () => {
  // Define the useSate
  const [user, setUser] = useState({});
  const [visibility, setvisibility] = useState(true);
  const { id } = useParams();

  const DataSingle = async (id) => {
    const response = await LoadDataSingleContact(id);
    setUser(response);
  };

  // Get Access API for information of particular ID contact
  useEffect(() => {
    DataSingle(id).then(() => {
      setvisibility(false);
    });
  }, [id]);

  return (
    <div style={{ marginTop: "50px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
        </div>

        <div className="container">
          <table className="styled-table" style={{ width: "100%" }}>
            <tbody>
              <tr>
                <th>
                  <strong>ID: </strong>
                </th>
                <td>
                  <span>{user.id}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <strong>Name: </strong>
                </th>
                <td>
                  <span>{user.cname}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <strong>Email: </strong>
                </th>
                <td>
                  <span>{user.email}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <strong>Contact No.: </strong>
                </th>
                <td>
                  <span>{user.contact}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <strong>Status.: </strong>
                </th>
                <td>
                  <span>
                    {user.cstatus === 0 ? "Not Completed" : "Completed"}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <Link to="/">
            <div className="btn btn-view-detail">Go Back</div>
          </Link>
        </div>
      </div>
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

export default View;
