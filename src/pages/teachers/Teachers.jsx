import React, { useEffect, useState } from "react";
import "./Teachers.scss";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Teachers = ({ user }) => {
  const [teachers, setTeachers] = useState([]);

  const fetchsetTeachers = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/teachers`);
      const str = await res.data;
      setTeachers(str);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchsetTeachers();
  }, []);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="all-teacher">
      <div className="like-header">
        <p className="teachers">Teachers</p>
        <input
          className="search"
          type="search"
          name="search"
          id="search"
          placeholder="Search ..."
        />
        <select className="filter" name="all" id="all">
          <option value="all">All</option>
          <option value="senior">Senior</option>
          <option value="middle">Middle</option>
          <option value="junior">Junior</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.firstname}</td>
              <td>{teacher.lastname}</td>
              <td>{teacher.level}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teachers;
