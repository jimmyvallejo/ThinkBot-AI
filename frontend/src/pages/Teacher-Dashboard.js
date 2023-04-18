import React, { useContext, useEffect, useState } from "react";
import { Button, SwipeableDrawer, Avatar, Box } from "@mui/material";
import "../styles/teacher_dashboard.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";


Chart.register();

const TeacherDashboard = ({}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [teacherDashboardData, setTeacherDashboardData] = useState(null);
  const [studentData, setStudentData] = useState(null);

  const [mathCounter, setMathCounter] = useState({ counter: 0 });
  const [scienceCounter, setScienceCounter] = useState(0);
  const [historyCounter, setHistoryCounter] = useState(0);

  const fetchTeacher = async () => {
    await fetch(
      "http://127.0.0.1:5001/miami-hackathon-ai/us-central1/api/teacher/EI0963XnsOV9xd5ivXsa"
    )
      .then((response) => response.json())
      .then((data) => setTeacherDashboardData(data));
  };

  useEffect(() => {
    fetchTeacher();
  }, []);

  // useEffect(() => {
  //   if (user?.role === "student") return navigate("/tutor");
  //   if (!user?.role) return navigate("/login");
  // }, [user]);

  console.log(teacherDashboardData);



  useEffect(() => {
    teacherDashboardData?.students?.map((student) => {
      student?.questions?.forEach((question) => {
        if (question.topic === "math") {
          setMathCounter((prev) => ({ ...prev, counter: prev.counter + 1 }));
          return;
        }
        if (question.topic === "science") {
          setScienceCounter((prev) => prev + 1);
          return;
        }
        if (question.topic === "history") {
          setHistoryCounter((prev) => prev + 1);
          return;
        }
      });
    });
  }, [teacherDashboardData]);

  const data = {
    labels: undefined,
    datasets: [
      {
        //  data: [, 10],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Box sx={{ paddingLeft: 3, paddingRight: 3 }}>
      <SwipeableDrawer open={openDrawer}>
        <div className="teacher-dashbaord-container">
          <Avatar
            alt="profile image"
            src="https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?s=612x612&w=0&k=20&c=Dw1nKFtnU_Bfm2I3OPQxBmSKe9NtSzux6bHqa9lVZ7A="
            sx={{ height: 75, width: 75 }}
          />
          <div className="teacher-dashbaord-container__button-items">
            <Button>Home</Button>
            <Button>Students</Button>
            <Button>Questions</Button>
            <Button
              className="teacher-dashbaord-container__button-items__signout"
              color="error"
              variant="contained"
            >
              Sign out
            </Button>
          </div>
        </div>
      </SwipeableDrawer>

      <div className="teacher-dashboard-content">
        <div className="teacher-dashboard-content__header">
          <h1>Welcome back, Allan Adams</h1>
          {/* <Button onClick={() => setOpenDrawer(true)} sx={{ height: 50 }}>Open Dashboard</Button> */}
        </div>

        <div className="teacher-dashboard-content__items">
          <div className="teacher-dashboard-content__student-roster">
            <h3>Support Needed</h3>

            {teacherDashboardData?.students &&
              teacherDashboardData.students.map((student, index) => {
                return (
                  <div className="teacher-dashboard-content__student-roster__item">
                    <div className="teacher-dashboard-content__student-roster__item__userInfo">
                      <Avatar
                        sx={{ height: 55, width: 55 }}
                        src={student.photoUrl}
                      />
                      <h4>{student.displayName}</h4>
                      {student.questions.map((question, index) => {
                        let uniqueChars = student.questions.filter(
                          (quest, index) => {
                            return (
                              student.questions.indexOf(quest.topic) === index
                            );
                          }
                        );

                        return <p>{uniqueChars}</p>;
                      })}
                    </div>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ height: 34 }}
                      onClick={() => setStudentData(student)}
                    >
                      View Questions
                    </Button>
                  </div>
                );
              })}
          </div>

          <div className="teacher-dashboard-content__student-questions">
            <h3>Low Improving Subjects</h3>
            <div className="dashboard__low-improving-subjects">
              <div className="dashboard__low-improving-subjects__item">
                <div className="dashboard__low-improving-subjects__item__left">
                  <h3 style={{ fontSize: 24, marginBottom: 6 }}>Science</h3>
                  <h2 style={{ fontSize: 16, marginBottom: 6 }}>
                    Real Life Questions
                  </h2>
                  <u>
                    <h5
                      style={{
                        color: "#77A52D",
                        fontSize: 18,
                        marginBottom: 6,
                      }}
                    >
                      Specific Topics
                    </h5>
                  </u>
                  <p>1. Parts of the Flower</p>
                  <p>2. General Biology</p>
                  <p>3. Omissions</p>
                </div>

                <div className="dashboard__low-improving-subjects__item__right">
                  <h3 style={{ fontSize: 24 }}>More Resources</h3>
                  <h1
                    style={{
                      color: "#FD0404",
                      fontSize: 40,
                      fontWeight: "bolder",
                    }}
                  >
                    {scienceCounter} Questions
                  </h1>
                  <h5>View More Details</h5>
                </div>
              </div>

              <div className="dashboard__low-improving-subjects__item">
                <div className="dashboard__low-improving-subjects__item__left">
                  <h3 style={{ fontSize: 24, marginBottom: 6 }}>History</h3>
                  <h2 style={{ fontSize: 16, marginBottom: 6 }}>
                    Real Life Questions
                  </h2>
                  <u>
                    <h5
                      style={{
                        color: "#77A52D",
                        fontSize: 18,
                        marginBottom: 6,
                      }}
                    >
                      Specific Topics
                    </h5>
                  </u>
                  <p>1. Parts of the Flower</p>
                  <p>2. General Biology</p>
                  <p>3. Omissions</p>
                </div>

                <div className="dashboard__low-improving-subjects__item__right">
                  <h3 style={{ fontSize: 24 }}>More Resources</h3>
                  <h1
                    style={{
                      color: "#FD0404",
                      fontSize: 40,
                      fontWeight: "bolder",
                    }}
                  >
                    {historyCounter} Questions
                  </h1>
                  {/* <Doughnut
                              data={{
                                 datasets: [{
                                    data: [historyCounter, 10]
                                 }]
                              }}
                              options={{
                                 plugins: {
                                   title: {
                                     display: false,
                                     text: "Users Gained between 2016-2020"
                                   }
                                 }
                               }}
                           /> */}
                  <h5>View More Details</h5>
                </div>
              </div>

              <div className="dashboard__low-improving-subjects__item">
                <div className="dashboard__low-improving-subjects__item__left">
                  <h3 style={{ fontSize: 24, marginBottom: 6 }}>Math</h3>
                  <h2 style={{ fontSize: 16, marginBottom: 6 }}>
                    Real Life Questions
                  </h2>
                  <u>
                    <h5
                      style={{
                        color: "#77A52D",
                        fontSize: 18,
                        marginBottom: 6,
                      }}
                    >
                      Specific Topics
                    </h5>
                  </u>
                  <p>1. Parts of the Flower</p>
                  <p>2. General Biology</p>
                  <p>3. Omissions</p>
                </div>

                <div className="dashboard__low-improving-subjects__item__right">
                  <h3 style={{ fontSize: 24 }}>More Resources</h3>
                  <h1
                    style={{
                      color: "#FD0404",
                      fontSize: 40,
                      fontWeight: "bolder",
                    }}
                  >
                    {mathCounter.counter} Questions
                  </h1>
                  <h5>View More Details</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {studentData && (
        <>
          <div
            className="teacher-dashboard-content__student-questions"
            style={{
              marginTop: 10,
              background: "transparent",
              borderWidth: 2,
              borderColor: "#9797971A",
              borderStyle: "solid",
            }}
          >
            <h3>Questioned Asked</h3>
            {studentData.questions.map((student, index) => {
              return (
                <>
                  <div className="teacher-dashboard-content__student-question__item">
                    <div className="teacher-dashboard-content__student-question__userInfo">
                      <div
                        className="teacher-dashboard-content__student-roster__item"
                        style={{ padding: 0 }}
                      >
                        <div className="teacher-dashboard-content__student-roster__item__userInfo">
                          <Avatar
                            sx={{ height: 55, width: 55 }}
                            src={studentData.photoUrl}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3>Question {index + 1}</h3>
                      <h3>{student.question}</h3>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </Box>
  );
};

export default TeacherDashboard;
