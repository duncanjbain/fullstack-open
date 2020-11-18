import React from "react";

const NotificationMessage = ({ message }) => {
  const alertStyle = {
    border: "1px red solid",
    marginTop: "1rem",
    padding: "0.25rem",
  };
  if (message === null) {
    return null;
  } else {
    return (
      <div style={alertStyle}>
        <p>{message}</p>
      </div>
    );
  }
};

export default NotificationMessage;
