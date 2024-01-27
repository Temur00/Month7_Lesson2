import React, { useEffect, useState } from "react";
import "./Students.scss";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Students = ({ user }) => {
  const [students, setStudents] = useState([]);
  const fetchStudents = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/students`);
      const str = await res.data;
      setStudents(str);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <div className="all-students">
        <div className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.firstname}</td>
                <td>{student.lastname}</td>
                <td>{student.level}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </div>
      </div>
    </div>
  );
};

export default Students;
