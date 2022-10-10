import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import "../assets/styles/Home.css";

import Pagination from "../pagination/Pagination";

import {
  ContactDataList,
  DeleteContactRecord,
  ChangeStatusUtility,
} from "../utils/ActionUtility.js";

const PageSize = process.env.REACT_APP_PAGESIZE;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Component for listing the contact
const Home = () => {
  // Define the useSate

  const [data, setData] = useState([]);
  const [status, setStatus] = useState("2");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibility, setvisibility] = useState(true);
  const [open, handleOpen] = useState(false);
  const [getId, setId] = useState("");

  // Close modal action

  const handleClose = () => {
    handleOpen(false);
  };

  // Handle the Deleted section
  const handleOpensec = (id) => {
    handleOpen(true);
    setId(id);
  };

  // Function for information of List of contact
  const loadData = async () => {
    const response = await ContactDataList();
    setData(response.data.data.Contact.reverse());
    
  };

  useEffect(() => {
    loadData().then(() => {
      setvisibility(false);
    });
  }, []);

  // Deleting the contact from database
  const deleteContact = async (id) => {
    setvisibility(true);

    await DeleteContactRecord(id);

    setTimeout(() => loadData(), 500);
    handleOpen(false);
    setvisibility(false);
  };

  // Method for change the status

  const changeStatus = async (id, sendStatus) => {
    setvisibility(true);
    await ChangeStatusUtility(id, sendStatus);

    setTimeout(() => loadData(), 50);
    setvisibility(false);
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

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (LoopData.length % 10 === 0) {
      return LoopData;
    } else {
      return LoopData.slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage, LoopData]);

  return (
    <div style={{ marginTop: "50px" }}>
      <ColorRing
        visible={visibility}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{ top: "50%", left: "50%" }}
        wrapperClass="blocks-wrapper"
        colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#429EA6"]}
      />
      <h2>Contact List</h2>
      <Link to="/addcontact">
        <button
          className="btn btn-contact"
          style={{ float: "left", marginLeft: "21%" }}
        >
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
          {currentTableData.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.cname}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>{item.cstatus === 0 ? "Not Completed" : "Completed"}</td>
                <td>
                  {!item.cstatus ? (
                    <Link to={`/update/${item.id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                  ) : (
                    <button className="btn btn-disable" disabled>
                      Edit
                    </button>
                  )}

                  <button
                    className="btn btn-delete"
                    onClick={() => handleOpensec(item.id)}
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
      <div className="paginationposition">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={LoopData.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure to delete the contact ?
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <button
              className="btn btn-confirm-delete"
              onClick={() => deleteContact(getId)}
            >
              Delete
            </button>
            <button className="btn btn-confirm-view" onClick={handleClose}>
              Close
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
