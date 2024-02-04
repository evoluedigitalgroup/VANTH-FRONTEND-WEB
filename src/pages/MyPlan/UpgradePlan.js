import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useRoutes } from "react-router-dom";

const plansImages = [
  {
    image: "/assets/img/basicPlanBlue.svg",
    imageSelected: "/assets/img/basicPlanBlack.svg",
  },
  {
    image: "/assets/img/standardPlanBlue.svg",
    imageSelected: "/assets/img/standardPlanBlack.svg",
  },
  {
    image: "/assets/img/premiumPlanBlue.svg",
    imageSelected: "/assets/img/premiumPlanBlack.svg",
  },
];

const UpgradePlan = ({ data, isUpdate, index }) => {

  const navigate = useNavigate()

  const onClickPurchase = () => {
    navigate(`/perfil/my-plan/purchase/plan/${data.id}`)
  };

  return (
    <div>
      <div
        className="p-3"
        style={{
          border: `1px solid ${data.selected ? "#97A7BA" : "#0068FF"}`,
          height: "160px",
          width: "260px",
          borderRadius: "12px",
        }}
      >
        <div>
          <h6
            className="m-0"
            style={{ fontSize: "14px", color: data.selected ? "#97A7BA" : "#0068FF", fontWeight: 800 }}
          >
            {data.planName.toUpperCase()}
          </h6>
          <Row className="mt-3">
            <Col xs={9} md={9}>
              <h6
                className="m-0"
                style={{
                  fontSize: 28, color: data.selected ? "#97A7BA" : "#0068FF", fontWeight: 700
                }}
              >
                {
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(data.monthlyPlanPrice)
                }
              </h6>
              <h6
                className="ms-1"
                style={{ fontSize: "12px", color: data.selected ? "#97A7BA" : "#0068FF", fontWeight: 600 }}
              >
                (Mensal)
              </h6>
              <Button
                disabled={data.selected}
                className="px-3 py-1 mt-2"
                style={{
                  backgroundColor: data.selected ? "#97A7BA" : "#0068FF",
                  fontSize: 10,
                  fontWeight: 600,
                }}
                onClick={onClickPurchase}
              >
                {isUpdate ? "Upgrade" : 'Comprar'}
              </Button>
            </Col>
            <Col xs={3} md={3}>
              <div>
                <img src={data.selected ? `${plansImages[index].imageSelected}` : `${plansImages[index].image}`} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlan;
