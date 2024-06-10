import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { removePlanSubscription } from "./api";
import { profileAtom } from "../../recoil/Atoms";
import { useRecoilValue } from "recoil";

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
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const profile = useRecoilValue(profileAtom);

  const onClickPurchase = () => {
    navigate(`/profile/my-plan/purchase/plan/${data.id}`);
  };

  const onClickCancel = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const ClickCancelComponent = () => {
    return (
      <Modal size="lg" show={showModal} centered className="zindex" onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Você deseja cancelar seu plano?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Confirmando abaixo, seu plano será cancelado!</h1>
          <p>
            Ao cancelar o seu plano, você concorda que o mesmo permanecerá ativo até o término da data estipulada na compra do plano. Esteja ciente de que, mesmo após o cancelamento, você continuará desfrutando dos benefícios e serviços associados ao plano até o período especificado na sua aquisição.
          </p>
          <div style={{ width: '100%', height: '50px' }} />
          <Button
            variant="danger"
            className="d-flex align-items-center px-3 border-0"
            onClick={async () => {
              try {
                const { subscription, id } = profile.companyData;
                const submitData = { subscription, id };

                const res = await removePlanSubscription(submitData);

                if (res.success) {
                  toast.success(res.message);
                  // Definir o estado como cancelado
                  setIsCanceled(true);
                  setShowModal(false);
                } else {
                  toast.warn(res.message);
                }
              } catch (err) {
                toast.warn("Erro!");
              }
            }}
          >
            <img src="/assets/img/X.png" alt="Cancelar" />
            &nbsp;
            <span style={{ fontSize: "15px" }} className="fw-bold">
              Cancelar Assinatura
            </span>
          </Button>
        </Modal.Body>
      </Modal>
    );
  };

  const CancelConfirmationModal = () => {
    return (
      <Modal size="lg" show={isCanceled} centered className="zindex" onHide={() => setIsCanceled(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Plano Cancelado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Seu plano foi cancelado com sucesso!</h1>
          <p>
            Seu plano permanecerá ativo até o término da data estipulada na compra do plano. 
            Você continuará desfrutando dos benefícios e serviços associados ao plano até o período especificado na sua aquisição.
          </p>
          <Button
            variant="primary"
            onClick={() => setIsCanceled(false)}
          >
            Fechar
          </Button>
        </Modal.Body>
      </Modal>
    );
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
                className="px-3 py-1 mt-2"
                style={{
                  backgroundColor: data.selected ? "#97A7BA" : "#0068FF",
                  fontSize: 10,
                  fontWeight: 600,
                }}
                onClick={data.selected ? onClickCancel : onClickPurchase}
              >
                {isUpdate ? (data.selected ? "Cancelar Assinatura" : "Trocar Plano") : 'Comprar'}
              </Button>
            </Col>
            <Col xs={3} md={3}>
              <div>
                <img src={data.selected ? `${plansImages[index].imageSelected}` : `${plansImages[index].image}`} alt="Plano" />
              </div>
            </Col>
          </Row>
          <ClickCancelComponent />
          <CancelConfirmationModal />
        </div>
      </div>
    </div>
  );
};

export default UpgradePlan;
