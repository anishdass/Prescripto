import React, { useContext } from "react";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";

const App = () => {
  const { atoken } = useContext(AdminContext);
  console.log(atoken);

  return atoken ? (
    <div>
      <ToastContainer />
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
