import React from "react";
import AfterAuth from "../../HOC/AfterAuth";
import { Card, Col, Row } from "react-bootstrap";
import Packages from "./Packages";
import UpgradePlan from "./UpgradePlan";
import NewProgressbar from "../NewProgressbar";
import Carousel from "react-elastic-carousel";

const MyPlan = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3, itemsToScroll: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  const CustomLeftArrow = () => {
    return (
      <>
        <i class="bi bi-chevron-right"></i>
      </>
    );
  };

  const CustomRightArrow = () => {
    return (
      <div className="d-flex align-items-center">
        <i class="bi bi-chevron-right"></i>
      </div>
    );
  };

  return (
    <AfterAuth>
      <div className="mx-3 mx-md-5 mt-3 d-flex align-items-center gap-4">
        <img src="/assets/img/leftArrow.svg" />
        <h3 className="pt-2">Meu plano</h3>
      </div>
      <Card className="my-3 mx-md-5 p-3 px-md-4 cardComponent">
        <div className="fw-bold">Dash de uso</div>
        <Row>
          <Col className="mt-2" xs={12} md={4}>
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
          <Col xs={12} md={4} className="d-flex justify-content-md-center mt-2">
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
          <Col xs={12} md={4} className="d-flex justify-content-md-end mt-2">
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
        <div className="mt-5 p-0">
          <h6>Pacotes adicionais</h6>
          <Row className="d-flex justify-content-center mt-3">
            <Carousel
              breakPoints={breakPoints}
              disableArrowsOnEnd={false}
              // renderArrow={myArrow}
              pagination={false}
            >
              <Packages />
              <Packages />
              <Packages />
              <Packages />
              <Packages />
            </Carousel>
          </Row>
          {/* <Row className="d-flex justify-content-center mt-3">
            <div className="d-flex justify-content-center gap-5">
              <Packages />
              <Packages />
              <Packages />
            </div>
          </Row> */}
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
            <Carousel
              className="d-md-none"
              breakPoints={breakPoints}
              disableArrowsOnEnd={false}
              pagination={false}
            >
              <UpgradePlan />
              <UpgradePlan />
              <UpgradePlan />
            </Carousel>

            <Col md={4} className="d-md-flex d-none justify-content-center">
              <UpgradePlan />
            </Col>
            <Col md={4} className="d-md-flex d-none justify-content-center">
              <UpgradePlan />
            </Col>
            <Col md={4} className="d-md-flex d-none justify-content-center">
              <UpgradePlan />
            </Col>
          </Row>
        </div>
      </Card>
    </AfterAuth>
  );
};

export default MyPlan;
