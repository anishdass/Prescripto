import React, { useContext } from "react";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";

const App = () => {
  const { atoken } = useContext(AdminContext);

  return atoken ? (
    <div className=' bg-[#f8f9fd]'>
      <ToastContainer />
      <Navbar />
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
