import React from "react";
import AfterAuth from "../../HOC/AfterAuth";
import { Card, Col, Row } from "react-bootstrap";
import Packages from "./Packages";
import UpgradePlan from "./UpgradePlan";

const MyPlan = () => {
  return (
    <AfterAuth>
      <div className="mx-3 mx-md-5 mt-3 d-flex align-items-center gap-4">
        <img src="/assets/img/leftArrow.svg" />
        <h3 className="pt-2">Meu plano</h3>
      </div>
      <Card className="my-3 mx-3 mx-md-5 p-3 px-4">
        <div>Dash de uso</div>
        <Row className="mt-3">
          <Col xs={12} md={4}>
            Hello1
          </Col>
          <Col xs={12} md={4}>
            Hello2
          </Col>
          <Col xs={12} md={4}>
            Hello3
          </Col>
        </Row>
        <div className="mt-5">
          <h6>Pacotes adicionais</h6>
          <Packages />
        </div>
        <div className="mt-5">
          <div className="d-flex gap-3">
            <h6>Upgrade de plano</h6>
            <button
              className="p-0 p-1"
              style={{
                border: "1px solid #FC671A",
                background: "transparent",
                fontSize: "10px",
                color: "#FC671A",
              }}
            >
              Ver site
            </button>
          </div>
          <Row className="justify-content-center mt-3">
            <Col md={4} className="d-flex justify-content-center">
              <UpgradePlan />
            </Col>
            <Col md={4} className="d-flex justify-content-center">
              <UpgradePlan />
            </Col>
            <Col md={4} className="d-flex justify-content-center">
              <UpgradePlan />
            </Col>
          </Row>
        </div>
      </Card>
    </AfterAuth>
  );
};

export default MyPlan;
