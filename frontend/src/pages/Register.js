import React, { useState } from "react";
import Student from "../components/Student";
import Teacher from "../components/Teacher";

function Register() {
  const [currentPage, setCurrentPage] = useState("Studentpage");

  const togglePage = () => {
    if (currentPage === "Studentpage") {
      setCurrentPage("Teacherpage");
    } else {
      setCurrentPage("Studentpage");
    }
  };

  return <div>{currentPage === "Studentpage" ? <Student /> : <Teacher />}</div>;
}

export default Register;
