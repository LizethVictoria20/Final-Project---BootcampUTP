import React from "react";
import { ImSad2 } from "react-icons/im";
import "./style-notfound.css"; // Importa tu archivo CSS

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-line"></div> {/* Línea morada detras de notfound-image */}
      <img
        src="https://i.ibb.co/mCQTXYd/404err.png"
        alt="404 Not Found Img"
        className="notfound-image"
      />
      <h1 className="notfound-title">404. That's an error <ImSad2 color="#7429BA"/></h1>
      <p className="notfound-text">
        The requested URL was not found on this server. That's an error.
      </p>
    </div>
  );
};

export default NotFound;
