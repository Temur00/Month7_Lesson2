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

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product? ❌")) {
      axios
        .delete(`http://localhost:3000/students/${id}`)
        .then((res) => {
          console.log("Product deleted successfully ✅", res.data);
          fetchStudents();
        })
        .catch((error) => {
          console.log("The product was not deleted ❌");
        });
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="wrong">
      <div className="all-students">
        <div className="like-header">
          <p className="students">Students</p>
          <input
            className="search"
            type="search"
            name="search"
            id="search"
            placeholder="Search ..."
          />
          <select className="filter" name="all" id="all">
            <option value="all">All</option>
            <option value="advanced">Advanced</option>
            <option value="intermediate">Intermediate</option>
            <option value="beginner">Beginner</option>
          </select>
        </div>
        <div className="table">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
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
                  <button onClick={() => handleDelete(student.id)}>
                    Delete
                  </button>
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
