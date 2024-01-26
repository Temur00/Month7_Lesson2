import React from "react";
import "./Teachers.scss";
import { Navigate } from "react-router-dom";

const Teachers = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <p className="teachers">Teachers</p>
    </div>
  );
};

export default Teachers;
