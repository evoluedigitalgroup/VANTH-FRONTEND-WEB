import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
  let navigate = useNavigate();

  setTimeout(() => {
    navigate("/login");
  }, 1000);
  return (
    <>
      <div className="mainPage Dashboard d-flex align-items-center justify-content-center">
        <Col md={12} className="d-flex justify-content-center">
          <div className="TBA-Logo d-flex align-items-center justify-content-center">
            <img src="/assets/img/vancehDigital.svg"></img>
          </div>
        </Col>
      </div>
    </>
  );
};

export default Dashboard;
