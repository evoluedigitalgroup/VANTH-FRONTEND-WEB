import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavbarCom from "../components/NavbarCom";
import Sidebar from "../components/Sidebar";

const AfterAuth = ({ children }) => {
  return (
    <div>
      <div
        style={{
          height: "7vh",
          position: "sticky",
          top: "0",
          zIndex: "5000",
        }}
      >
        <NavbarCom />
      </div>
      <Row className="afterAuthMainRow p-0 m-0" style={{ height: "93vh" }}>
        <Col
          md={2}
          id="sidebar-wrapper"
          className="px-0 afterAuthSidebar"
          style={{
            overflow: "hidden !important",
          }}
        >
          <Sidebar />
        </Col>
        <Col
          md={10}
          id="page-content-wrapper"
          className="pt-4 childrenHeight"
          style={{
            backgroundColor: "#DCDFE5",
            overflowY: "scroll",
            overflowX: "hidden",
            height: "100%",
          }}
        >
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default AfterAuth;
