import React from "react";
import Navbar from "../Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="text-center" style={{ paddingTop: "50px" }}>
        <div>
          <img
            src="https://i.ibb.co/mCQTXYd/404err.png"
            alt="404 Not Found Img"
            className="img-fluid"
          />
          <h1 className="mt-4">404. That's an error</h1>
          <p className="lead">
            The requested URL was not found on this server. That's an error.
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
