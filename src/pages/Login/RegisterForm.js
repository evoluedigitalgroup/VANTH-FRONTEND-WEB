import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";

const RegisterForm = ({
  handleRegisterForm,
  registerUser,
  hidePassword,
  hidePwd,
  hideCnfrmPassword,
  hideCnfrmPwd,
  confirmPassword,
  setConfirmPassword,
  loading,
  registerFormValues,
  getDesignaition,
  showLoginFrom,
}) => {
  const [company, setCompany] = useState(true);
  const [member, setMember] = useState(false);

  const Company = () => {
    setCompany(true);
    setMember(false);
  };

  const Member = () => {
    setMember(true);
    setCompany(false);
  };

  const onRegister = (e) => {
    e.preventDefault();
    const userType = company ? "company" : "member";
    registerUser(e, userType);
  };

  return (
    <div>
      <form onSubmit={onRegister}>
        <div className="mt-3 d-flex gap-5">
          <div>
            {company && (
              <div className="login-enter fw-bold actives">Empresa</div>
            )}
            {member && (
              <div className="login-enter fw-bold inactive" onClick={Company}>
                Empresa
              </div>
            )}
          </div>
          <div>
            {company && (
              <div className="login-enter fw-bold inactive" onClick={Member}>
                Membro
              </div>
            )}
            {member && (
              <div className="login-enter fw-bold actives">Membro</div>
            )}
          </div>
        </div>
        {company && (
          <Row>
            <Col md={12} className="mt-3">
              <Form.Label className="fs-6 fw-bold">Nome da empresa</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" className="p-2">
                  <i className="bi bi-hash" style={{ color: "#CED4DB" }}></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="O nome da sua empresa"
                  className="ps-0"
                  name="companyName"
                  onChange={handleRegisterForm}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              <Form.Label className="fs-6 fw-bold">Nome</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" className="p-2">
                  <i
                    className="bi bi-person-fill"
                    style={{ color: "#CED4DB" }}
                  ></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Seu primeiro e último nome"
                  className="ps-0"
                  name="name"
                  onChange={handleRegisterForm}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              <Form.Label className="fs-6 fw-bold">E-mail</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" className="p-2">
                  <i
                    className="bi bi-envelope"
                    style={{ color: "#CED4DB" }}
                  ></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="E-mail"
                  className="ps-0"
                  name="email"
                  onChange={handleRegisterForm}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              <Form.Label className="fs-6 fw-bold">Senha</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" className="p-2">
                  <i
                    className="bi bi-lock-fill"
                    style={{ color: "#CED4DB" }}
                  ></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Sua senha"
                  className="eye-logo ps-0"
                  name="password"
                  type={hidePassword ? "text" : "password"}
                  onChange={handleRegisterForm}
                  aria-describedby="basic-addon1"
                />
                <InputGroup.Text id="basic-addon1" className="p-2">
                  {hidePassword && (
                    <i
                      className="bi bi-eye-slash-fill"
                      style={{ color: "#CED4DB" }}
                      onClick={hidePwd}
                    ></i>
                  )}

                  {!hidePassword && (
                    <i
                      className="bi bi-eye-fill"
                      style={{ color: "#CED4DB" }}
                      onClick={hidePwd}
                    ></i>
                  )}
                </InputGroup.Text>
              </InputGroup>

              <Form.Label className="fs-6 fw-bold">Repetir senha</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" className="p-2">
                  <i
                    className="bi bi-lock-fill"
                    style={{ color: "#CED4DB" }}
                  ></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Sua senha"
                  className="eye-logo ps-0"
                  aria-describedby="basic-addon1"
                  name="confirmPassword"
                  type={hideCnfrmPassword ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputGroup.Text id="basic-addon1" className="p-2">
                  {hideCnfrmPassword && (
                    <i
                      className="bi bi-eye-slash-fill"
                      style={{ color: "#CED4DB" }}
                      onClick={hideCnfrmPwd}
                    ></i>
                  )}

                  {!hideCnfrmPassword && (
                    <i
                      className="bi bi-eye-fill"
                      style={{ color: "#CED4DB" }}
                      onClick={hideCnfrmPwd}
                    ></i>
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
        )}
        {member && (
          <Row>
            <Col md={12} className="mt-3">
              <Form.Label className="fs-6 fw-bold">
                Código para criação
              </Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" className="p-2">
                  <i className="bi bi-hash" style={{ color: "#CED4DB" }}></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder=" Código que você recebeu"
                  className="ps-0"
                  name="code"
                  onChange={handleRegisterForm}
                  aria-describedby="basic-addon1"
                  onBlur={getDesignaition}
                />
              </InputGroup>

              <Form.Label className="fs-6 fw-bold">Seu cargo</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" className="p-2">
                  <i
                    className="bi bi-bag-dash-fill"
                    style={{ color: "#CED4DB" }}
                  ></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Sua função"
                  name="designation"
                  className="ps-0"
                  onChange={handleRegisterForm}
                  disabled
                  defaultValue={registerFormValues.designation}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              <Form.Label className="fs-6 fw-bold">Nome</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" className="p-2">
                  <i
                    className="bi bi-person-fill"
                    style={{ color: "#CED4DB" }}
                  ></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Seu primeiro e último nome"
                  className="ps-0"
                  name="name"
                  onChange={handleRegisterForm}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              <Form.Label className="fs-6 fw-bold">E-mail</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" className="p-2">
                  <i
                    className="bi bi-envelope"
                    style={{ color: "#CED4DB" }}
                  ></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="E-mail"
                  className="ps-0"
                  name="email"
                  onChange={handleRegisterForm}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              <Form.Label className="fs-6 fw-bold">Senha</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" className="p-2">
                  <i
                    className="bi bi-lock-fill"
                    style={{ color: "#CED4DB" }}
                  ></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Sua senha"
                  className="eye-logo ps-0"
                  name="password"
                  type={hidePassword ? "text" : "password"}
                  onChange={handleRegisterForm}
                  aria-describedby="basic-addon1"
                />
                <InputGroup.Text id="basic-addon1" className="p-2">
                  {hidePassword && (
                    <i
                      className="bi bi-eye-slash-fill"
                      style={{ color: "#CED4DB" }}
                      onClick={hidePwd}
                    ></i>
                  )}

                  {!hidePassword && (
                    <i
                      className="bi bi-eye-fill"
                      style={{ color: "#CED4DB" }}
                      onClick={hidePwd}
                    ></i>
                  )}
                </InputGroup.Text>
              </InputGroup>

              <Form.Label className="fs-6 fw-bold">Repetir senha</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" className="p-2">
                  <i
                    className="bi bi-lock-fill"
                    style={{ color: "#CED4DB" }}
                  ></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Sua senha"
                  className="eye-logo ps-0"
                  aria-describedby="basic-addon1"
                  name="confirmPassword"
                  type={hideCnfrmPassword ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputGroup.Text id="basic-addon1" className="p-2">
                  {hideCnfrmPassword && (
                    <i
                      className="bi bi-eye-slash-fill"
                      style={{ color: "#CED4DB" }}
                      onClick={hideCnfrmPwd}
                    ></i>
                  )}

                  {!hideCnfrmPassword && (
                    <i
                      className="bi bi-eye-fill"
                      style={{ color: "#CED4DB" }}
                      onClick={hideCnfrmPwd}
                    ></i>
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
        )}
        <Row className="d-flex justify-content-center w-100 m-0 my-4">
          <Col xs={6} md={6} className="d-md-none">
            <Button
              className="py-2"
              onClick={showLoginFrom}
              style={{
                width: "100%",
                color: "#0068FF",
                backgroundColor: "white",
                fontSize: 16,
                fontWeight: 800,
                border: "1px solid #0068FF",
              }}
            >
              Enviar
            </Button>
          </Col>
          <Col xs={6} md={6}>
            <Button
              className="py-2"
              onClick={onRegister}
              disabled={loading}
              type="submit"
              style={{
                width: "100%",
                color: "white",
                backgroundColor: "#0068FF",
                fontSize: 16,
                fontWeight: 800,
                border: "1px solid #0068FF",
              }}
            >
              Criar conta
              {loading && (
                <Spinner
                  animation="grow"
                  variant="light"
                  className="ms-3 py-2 fw-bold fs-4"
                />
              )}
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default RegisterForm;
