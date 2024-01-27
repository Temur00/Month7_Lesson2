import React, { useEffect, useState } from "react";
import "./Teachers.scss";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Students from "../students/Students";

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

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product? ❌")) {
      axios
        .delete(`http://localhost:3000/teachers/${id}`)
        .then((res) => {
          console.log("Product deleted successfully ✅", res.data);
          // Fetch teachers data after successful deletion
          fetchsetTeachers();
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
    <div className="all-teachers">
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
                <button onClick={() => handleDelete(teacher.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teachers;
