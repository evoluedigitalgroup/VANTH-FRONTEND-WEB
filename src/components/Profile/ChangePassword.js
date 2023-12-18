import React, { useState } from "react";
import { Row, Col, ModalTitle } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import { ButtonGreen, ButtonRed } from './buttons/Button';
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { passwordChange } from "../../helper/API/Profile";

const ChangePassword = ({ open, handleClose }) => {
  const [hidePassword, setHidePassword] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formValues, setFormValues] = useState({
    oldPasswords: "",
    passwords: "",
    confirmPasswords: "",
  });

  const handledataValue = (e) => {
    let temp = formValues;
    temp[e.target.name] = e.target.value;
    setFormValues(temp);
  };
  const dataSubmit = () => {
    if (!formValues.oldPasswords) {
      toast.error("Digite a senha antiga");
    } else if (!formValues.passwords) {
      toast.error("Digite a nova senha");
    } else if (!formValues.confirmPasswords) {
      toast.error("Por favor, digite a senha de confirmação");
    } else if (formValues.confirmPasswords !== formValues.passwords) {
      toast.error("Senha não coincide");
    } else {
      const submitData = {
        oldPassword: formValues.oldPasswords,
        newPassword: formValues.passwords,
      };
      passwordChange(submitData).then((res) => {
        if (res.success) {
          toast.success(res.message);
          handleClose();
        } else {
          toast.error(res.message);
        }
      });
    }
  };
  return (
    <>
      <Modal
        className="zindex mt-5"
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <ModalTitle></ModalTitle>
        <Modal.Body>
          <div className="d-flex justify-content-between mx-2">
            <h6 className="fw-bolder fs-5 px-md-2 pt-3">Alterar senha</h6>
            <Button
              onClick={handleClose}
              className="border-0 text-dark p-0 fs-4 bg-white"
            >
              <img src="assets/img/close.png"></img>
            </Button>
          </div>
          {/* <Row>
            <Col md={9} className="fw-bolder fs-5 m-3 ">
              Alterar senha
            </Col>
            <Col md={2} className="text-center">
              <Button
                onClick={handleClose}
                className="border-0 text-dark p-0  fs-4 bg-white"
              >
                <img src="assets/img/close.png"></img>
              </Button>
            </Col>
          </Row> */}
          <Row className="">
            <Col md={10} className="mx-auto px-md-0 my-2">
              <p className="fw-bold my-1 small">Senha atual</p>
              <InputGroup className="mb-3 border-0 rounded">
                <InputGroup.Text
                  className="border-0"
                  style={{ backgroundColor: "#F4F6F8" }}
                >
                  <i class="bi bi-lock-fill" style={{ color: "#CED4DB" }}></i>
                </InputGroup.Text>
                <Form.Control
                  className="border-0 ps-0 shadow-none"
                  placeholder="Sua senha atual"
                  type={"text"}
                  onChange={(e) => handledataValue(e)}
                  name={"oldPasswords"}
                />
              </InputGroup>
            </Col>
            <Col md={10} className="mx-auto px-md-0  my-2">
              <Form.Label className="small fw-bold">Nova senha</Form.Label>
              <InputGroup className="mb-3 rounded">
                <InputGroup.Text
                  className="border-0"
                  style={{ backgroundColor: "#F4F6F8" }}
                >
                  <i class="bi bi-lock-fill" style={{ color: "#CED4DB" }}></i>
                </InputGroup.Text>

                <Form.Control
                  placeholder="Nova senha"
                  className="eye-logo ps-0 border-0"
                  name="passwords"
                  type={hidePassword ? "text" : "password"}
                  onChange={(e) => handledataValue(e)}
                  aria-describedby="basic-addon1"
                />
                <InputGroup.Text className="p-2 border-0">
                  {hidePassword && (
                    <i
                      class="bi bi-eye-slash-fill"
                      style={{ color: "#CED4DB" }}
                      onClick={() => setHidePassword(!hidePassword)}
                    ></i>
                  )}

                  {!hidePassword && (
                    <i
                      class="bi bi-eye-fill"
                      style={{ color: "#CED4DB" }}
                      onClick={() => setHidePassword(!hidePassword)}
                    ></i>
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Col>
            <Col md={10} className="mx-auto px-md-0  my-2">
              <Form.Label className="small fw-bold">
                Repetir nova senha
              </Form.Label>
              <InputGroup className="mb-3 border-0 rounded">
                <InputGroup.Text className="p-2 border-0">
                  <i class="bi bi-lock-fill" style={{ color: "#CED4DB" }}></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Repetir nova senha"
                  className="eye-logo ps-0 border-0"
                  aria-describedby="basic-addon1"
                  name="confirmPasswords"
                  type={hideConfirmPassword ? "text" : "password"}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    handledataValue(e);
                  }}
                />
                <InputGroup.Text className="p-2 border-0">
                  {hideConfirmPassword && (
                    <i
                      class="bi bi-eye-slash-fill"
                      style={{ color: "#CED4DB" }}
                      onClick={() =>
                        setHideConfirmPassword(!hideConfirmPassword)
                      }
                    ></i>
                  )}

                  {!hideConfirmPassword && (
                    <i
                      class="bi bi-eye-fill"
                      style={{ color: "#CED4DB" }}
                      onClick={() =>
                        setHideConfirmPassword(!hideConfirmPassword)
                      }
                    ></i>
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Col>

            <Col md={11} className="mx-auto my-2 text-center">
              <Button
                onClick={dataSubmit}
                className="fw-bolder fs-6 w-50 border-0	"
                style={{ backgroundColor: "#0068FF" }}
              >
                Alterar
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChangePassword;
