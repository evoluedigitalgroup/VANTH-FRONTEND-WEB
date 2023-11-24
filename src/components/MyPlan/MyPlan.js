import React from "react";
import AfterAuth from "../../HOC/AfterAuth";
import { Card, Col, Row } from "react-bootstrap";
import Packages from "./Packages";
import UpgradePlan from "./UpgradePlan";
import NewProgressbar from "../NewProgressbar";

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
            <div style={{ width: "265px" }}>
              <NewProgressbar
                bgcolor="#0068FF"
                title="Armazenamento"
                progress="55"
                title1="usados"
              />
              <span style={{ fontSize: "12px", color: "#97A7BA" }}>
                10,47 GB de 25 GB usados
              </span>
            </div>
          </Col>
          <Col
            xs={12}
            md={4}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={{ width: "265px" }}>
              <NewProgressbar
                bgcolor="#0068FF"
                title="Contratos assinados"
                progress="50"
                title1=""
              />
              <span style={{ fontSize: "12px", color: "#97A7BA" }}>
                10 de 25 contratos
              </span>
            </div>
          </Col>
          <Col
            xs={12}
            md={4}
            style={{ display: "flex", justifyContent: "end" }}
          >
            <div style={{ width: "265px" }}>
              <NewProgressbar
                bgcolor="#0068FF"
                title="Usuários do sistema"
                progress="45"
                title1=""
              />
              <span style={{ fontSize: "12px", color: "#97A7BA" }}>
                2 de 5 usuários
              </span>
            </div>
          </Col>
        </Row>
        <div className="mt-5">
          <h6>Pacotes adicionais</h6>
          <Row className="justify-content-center mt-3">
            <Col md={4} className="d-flex justify-content-center">
              <Packages />
            </Col>
            <Col md={4} className="d-flex justify-content-center">
              <Packages />
            </Col>
            <Col md={4} className="d-flex justify-content-center">
              <Packages />
            </Col>
          </Row>
        </div>
        <div className="mt-5">
          <div className="d-flex gap-3">
            <h6>Upgrade de plano</h6>
            <button
              className="p-0 p-1"
              style={{
                border: "1px solid #0068FF",
                background: "transparent",
                fontSize: "10px",
                color: "#0068FF",
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
