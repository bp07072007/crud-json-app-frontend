import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./component/Home";
import AddEdit from "./component/AddEdit";

import View from "./component/View";


import View from "./component/View";



function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addcontact" element={<AddEdit />} />

          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/view/:id" element={<View />} />


          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/view/:id" element={<View />} />


          <Route path="/update/:id" element={<AddEdit />} />


          <Route path="/update/:id" element={<AddEdit />} />


          <Route path="/update/:id" element={<AddEdit />} />





        </Routes>
      </div>
    </Router>
  );
}

export default App;
