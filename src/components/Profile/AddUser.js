import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { generateCode, inviteAdmin } from "../../helper/API/auth";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";

const AddUser = ({ open, handleClose }) => {
  const [copyText, setCopyText] = useState(false);
  const [contact, setContact] = useState(false);
  const [document, setDocument] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [designation, setDesignation] = useState("");
  const [code, setCode] = useState(null);

  useEffect(() => {
    generateCode().then((res) => {
      if (res.success) {
        setCode(res.data);
      }
    });
  }, []);

  const submitAdmin = () => {
    const submitData = {
      designation: designation,
      permissions: {
        contact,
        document,
        newUser,
      },
      code,
    };
    inviteAdmin(submitData).then((res) => {
      if (res.success) {
        toast.success(res.message);
        copy(code);
        handleClose();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <Modal
        className="mt-5 zindex"
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className="">
          <div className="d-flex justify-content-between">
            <h6 className="fw-bolder fs-5 my-3">Código para nova conta</h6>
            <Button
              onClick={handleClose}
              className="border-0 text-dark p-0 mx-4 fs-5 bg-white "
            >
              <img src="/assets/img/close.png"></img>
            </Button>
          </div>
          {/* <Row>
            <Col md={10} className="fw-bolder fs-5 my-3 ">
              Código para nova conta
            </Col>
            <Col md={2} className="">
              <Button
                onClick={handleClose}
                className="border-0 text-dark p-0 mx-4 fs-4 bg-white "
              >
                <img src="assets/img/close.png"></img>
              </Button>
            </Col>
          </Row> */}
          <Row className="px-1 py-0">
            <Col md={12} className="">
              <p className="fs-6 fw-bold">Qual o cargo da pessoa?</p>
              <InputGroup
                className="mb-3 border-0 rounded "
                style={{ backgroundColor: "#F4F6F8" }}
              >
                <InputGroup.Text className=" border-0 ">
                  <img src="/assets/img/briefcase.png " />
                </InputGroup.Text>
                <Form.Control
                  style={{ backgroundColor: "#F4F6F8" }}
                  className="border-0 shadow-none"
                  placeholder="Digite o cargo"
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={12}>
              <p className="fw-bold fs-6 mt-3 mb-0">Autorizações</p>
              <Table className="border-white p-3 table-fit text-wrap tbl-color-text text-center mb-4 ">
                <thead className="border-white small fw-normal">
                  <tr className="text-start">
                    <th style={{ color: "#B5B6B7" }}>Contatos </th>
                    <th style={{ color: "#B5B6B7" }}>Documentos </th>
                    <th style={{ color: "#B5B6B7" }}>Nova conta</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-start">
                    <td className="fw-bold small p-0">
                      {contact ? (
                        <Button
                          onClick={() => setContact(!contact)}
                          variant=" success"
                          className=" button-green  fw-bold text-success p-0  border-0 "
                        >
                          <small className="d-flex align-items-center">
                            <i className="bi bi-check fw-bold fs-5"></i>
                            Autorizar
                          </small>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setContact(!contact)}
                          variant="danger"
                          className=" fw-bold small text-danger button-red p-0"
                        >
                          <small className="d-flex align-items-center">
                            <i className="bi bi-x fw-bold fs-5"></i>
                            Remover
                          </small>
                        </Button>
                      )}
                    </td>
                    <td className="p-0">
                      {document ? (
                        <Button
                          onClick={() => setDocument(!document)}
                          variant=" success"
                          className="small button-green  fw-bold text-success p-0 border-0 "
                        >
                          <small className="d-flex align-items-center">
                            <i className="bi bi-check fs-5 fw-bold"></i>
                            Autorizar
                          </small>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setDocument(!document)}
                          variant="danger"
                          className="small fw-bold text-danger button-red p-0"
                        >
                          <small className="d-flex align-items-center">
                            <i className="bi bi-x fs-5 fw-bold"></i>
                            Remover
                          </small>
                        </Button>
                      )}
                    </td>
                    <td className="p-0">
                      {newUser ? (
                        <Button
                          onClick={() => setNewUser(!newUser)}
                          variant=" success"
                          className="small button-green  fw-bold text-success p-0 border-0 "
                        >
                          <small className="d-flex align-items-center">
                            <i className="bi bi-check fs-5 fw-bold"></i>
                            Autorizar
                          </small>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setNewUser(!newUser)}
                          variant="danger"
                          className="small fw-bold text-danger button-red p-0"
                        >
                          <small className="d-flex align-items-center">
                            <i className="bi bi-x fs-5 fw-bold"></i>
                            Remover
                          </small>
                        </Button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md={12}>
              <p className="fw-bold fs-6">Código para criação de conta</p>
              <InputGroup className="mb-3">
                <Form.Control
                  className="p-2 border-0 fw-bold shadow-none"
                  style={{ backgroundColor: "#F4F6F8" }}
                  value={code}
                />
                {/* <InputGroup.Text
									className='border-0 small fw-bold'
									style={{
										backgroundColor: "#F4F6F8",
										cursor: "pointer",
										color: "#85A6A2",
									}}
									onClick={() => handleCopy(code)}>
									{copyText ? "Copiada" : "Copiar"}
								</InputGroup.Text> */}
              </InputGroup>
            </Col>
            {/* button */}
            <Col className="text-center my-3">
              <Button
                onClick={submitAdmin}
                className="fw-bolder fs-6 w-50 border-0"
                style={{ backgroundColor: "#0068FF" }}
              >
                {/* Gerar código */}
                Copiar
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddUser;
