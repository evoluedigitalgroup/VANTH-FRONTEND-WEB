import React from "react";
import { Button, Col } from "react-bootstrap";
// import Dropzone from "react-dropzone";

const DocsBlock = ({
  obj,
  item,
  permission,
  handleShowImageModal,
  withInput = false,
  handleFileChange = () => { },
}) => {

  //  File not attached in the docs & also not found in the docStatus
  const isNotAttached =
    obj?.docs?.[item.label] === null && !obj?.docStatus?.[item.label];

  //  File attached & found in docs but not approved
  const isWaitingForApproval =
    obj?.docs?.[item.label] && !obj?.docs?.[item.label]?.approved;

  //  File attached & found in docs & approved
  const isApproved =
    obj?.docs?.[item.label] && obj?.docs?.[item.label]?.approved;

  //  File attached attached but since rejected, found in docStatus
  const isRejected =
    obj?.docs?.[item.label] && obj?.docs?.[item.label]?.rejected;


  return (
    <Col
      md={4}
      style={{
        margin: "1rem 0rem",
        position: "relative",
      }}
    >
      {withInput && !isApproved && !isWaitingForApproval && (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute"
          }}
        >
          <input
            id="upfile"
            type="file"
            accept={".pdf"}
            name="abcCurve"
            onChange={(e) => handleFileChange(e, item.label)}
            style={{
              zIndex: 1000,
              opacity: "0",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      )}
      <Col
        style={{
          color: "#B5B6B7",
        }}
      >
        {item.title}
      </Col>
      <Col>
        {isNotAttached && (
          <Button
            className="w-100 p-0 ms-0"
            onClick={
              obj?.docs?.[item.label] === null
                ? null
                : () => handleShowImageModal(obj, item.label)
            }
            variant="outline-secondary"
          >
            <label
              style={{
                rotate: "45deg",
                zIndex: 1,
              }}
            >
              <i className="bi bi-paperclip fs-2"></i>
            </label>
            <h6
              style={{
                color: "#C4CCD2",
                fontSize: "11px",
              }}
            >
              Arraste e solte aqui ou importe dos seus arquivos
            </h6>
          </Button>
        )}
        {isWaitingForApproval && (
          <Button
            className="w-100 p-0 ms-0 position-relative"
            onClick={
              obj?.docs?.[item.label] === null
                ? null
                : () => handleShowImageModal(obj, item.label)
            }
            variant="outline-warning"
          >
            {Object.keys(obj?.docs?.[item.label]).length ? null : (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  color: '#FF0000',
                  zIndex: 1000,
                  padding: 10
                }}
                onClick={(e) => {
                  handleFileChange(e, item.label, true)
                }}
              >X</div>
            )}
            <i className="bi bi-clock-fill fs-2"></i>
            <h6
              style={{
                color: "#C4CCD2",
                fontSize: "11px",
              }}
            >
              Aguardando análise, visualizar?
            </h6>
          </Button>
        )}

        {isApproved && (
          <Button
            className="w-100 p-0 ms-0"
            onClick={
              obj?.partnerIncome === null
                ? null
                : () => handleShowImageModal(obj, item.label)
            }
            variant="outline-success"
          >
            <i className="bi bi-check-lg fs-2"></i>

            <h6
              style={{
                color: "#C4CCD2",
                fontSize: "11px",
              }}
            >
              Já aprovada, visualizar?
            </h6>
          </Button>
        )}
        {isRejected && (
          <Button
            className="w-100  p-0 ms-0 reject-card"
            onClick={
              obj?.partnerIncome === null
                ? null
                : () => handleShowImageModal(obj, item.label)
            }
            style={{ border: "1px solid #E97F1E" }}
          >
            <i className="bi bi-x-lg fs-2 fw-bold rejected-cross"></i>
            <h6
              style={{
                color: "#C4CCD2",
                fontSize: "11px",
              }}
            >
              Aguardando reenvio de documentação
            </h6>
          </Button>
        )}
      </Col>
    </Col>
  );
};

export default DocsBlock;
