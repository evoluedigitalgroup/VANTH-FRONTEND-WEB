import React from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";

const ReviewContractModal = ({ show, onHide, data }) => {
  const documentUrl = data?.data.signedDocumentUrl; // Corrigido para usar o campo diretamente

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Visualizar Documento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {documentUrl ? (
          <div
            className="border d-flex align-items-center justify-content-center rounded mb-3"
            style={{ height: "400px" }}
          >
            <iframe
              src={documentUrl}
              style={{
                height: "100%",
                width: "100%",
                border: "none",
              }}
              title="Visualização do Documento"
            />
          </div>
        ) : (
          <p className="text-center">Nenhum documento disponível.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Row className="w-100">
          <Col>
            <Button
              variant="secondary"
              className="w-100"
              onClick={onHide}
            >
              Fechar
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewContractModal;
