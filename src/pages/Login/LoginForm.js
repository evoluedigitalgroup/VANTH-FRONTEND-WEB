import React from "react";
import { Button, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginForm = ({
  formValues,
  handleForm,
  ProLogin,
  hidePassword,
  hidePwd,
  loading,
  login,
}) => {
  return (
    <div>
      <form method="POST" onSubmit={ProLogin}>
        <Row>
          <Col md={12} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fs-5 fw-bold">Email</Form.Label>
              <InputGroup className="mb-4">
                <InputGroup.Text id="basic-addon1" className="p-2">
                  <i
                    className="bi bi-person-fill"
                    style={{ color: "#CED4DB" }}
                  ></i>
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleForm}
                  value={formValues.email}
                  className="ps-0"
                  controlId="formBasicEmail"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fs-5 fw-bold">Senha</Form.Label>
              <InputGroup className="mb-4">
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
                  value={formValues.password}
                  onChange={handleForm}
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
            </Form.Group>
            <Link to="/forgot-password" className="text-decoration-none">
              <p className="text-end">Esqueceu sua senha?</p>
            </Link>
            <Form.Group className="mb-4" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Lembrar" />
            </Form.Group>
          </Col>
          <Row className="d-flex justify-content-center w-100 m-0 my-4">
            <Col xs={6} md={6} className="d-md-none">
              <Button
                className="py-2"
                onClick={login}
                style={{
                  width: "100%",
                  color: "#0068FF",
                  backgroundColor: "white",
                  fontSize: 16,
                  fontWeight: 800,
                  border: "1px solid #0068FF",
                }}
              >
                Cadastrar
              </Button>
            </Col>
            <Col xs={6} md={6}>
              <Button
                className="py-2"
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  color: "white",
                  backgroundColor: "#0068FF",
                  fontSize: 16,
                  fontWeight: 800,
                  border: "1px solid #0068FF",
                }}
              >
                Enviar
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
          {/* <Col className="d-flex mt-5 justify-content-center">
            <Button
              className="login-btn px-5 py-2 fw-bold fs-4 d-flex align-items-center"
              type="submit"
              disabled={loading}
            >
              Enviar
              {loading && (
                <Spinner
                  animation="grow"
                  variant="light"
                  className="ms-3 py-2 fw-bold fs-4"
                />
              )}
            </Button>
          </Col> */}
        </Row>
      </form>
    </div>
  );
};

export default LoginForm;
