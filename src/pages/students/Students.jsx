import React from "react";
import "./Students.scss";
import { Navigate } from "react-router-dom";

const Students = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <p className="students">Students</p>
    </div>
  );
};

export default Students;
