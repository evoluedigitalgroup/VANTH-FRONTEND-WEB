import React from "react";
import { Button, Col, Row } from "react-bootstrap";

const UpgradePlan = () => {
  return (
    <div>
      <div
        className="p-3"
        style={{
          border: "1px solid #0068FF",
          height: "160px",
          width: "260px",
          borderRadius: "12px",
        }}
      >
        <div>
          <h6
            className="m-0"
            style={{ fontSize: "14px", color: "#0068FF", fontWeight: 800 }}
          >
            STANDARD
          </h6>
          <Row className="mt-3">
            <Col xs={9} md={9}>
              <h6
                className="m-0"
                style={{ fontSize: "32px", color: "#0068FF", fontWeight: 700 }}
              >
                R$ 759,00
              </h6>
              <h6
                className="ms-1"
                style={{ fontSize: "12px", color: "#0068FF", fontWeight: 600 }}
              >
                (Mensal)
              </h6>
              <Button
                className="px-3 py-1 mt-2"
                style={{
                  backgroundColor: "#0068FF",
                  fontSize: 10,
                  fontWeight: 600,
                }}
              >
                Upgrade
              </Button>
            </Col>
            <Col xs={3} md={3}>
              <div>
                <img src="/assets/img/standardPlan.svg" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlan;
