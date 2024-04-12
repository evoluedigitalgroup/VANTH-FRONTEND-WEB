import { useNavigate, useParams } from "react-router-dom";
import { Col, Row, Spinner, Form, InputGroup, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { resetPassword } from "../../helper/API/auth";
import { toast } from "react-toastify";

export function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleForm = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    if (formValues.password !== formValues.confirmPassword) {
      toast.error("As senhas não coincidem");
      setLoading(false);
      return;
    }

    resetPassword({
      password: formValues.password,
      token: token,
    })
      .then((response) => {
        if (response.success) {
          toast.success("Senha redefinida com sucesso");
          navigate("/login");
        } else {
          toast.error(response.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error("Erro ao redefinir a senha");
        setLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Vanth System | Redefinição de senha</title>
      </Helmet>
      <div className="Dashboard d-none d-md-flex align-items-center" style={{
        backgroundImage: "url(/assets/backgrounds/reset-password.png)",
      }}>
        <Row className="w-100 m-1 d-flex align-items-center justify-content-center">
          <Col
            md={4}
            sm={4}
            xs={12}
            className="d-flex mb-3 justify-content-start"
          >
            <div className="TBA-Logo d-flex align-items-center justify-content-center">
              <img src="/assets/img/vancehDigital.svg"></img>
            </div>
          </Col>
          <Col md={4} sm={4} xs={12} className="Login p-4">
            <h4 className="fw-bold fs-4">Redefinição de senha</h4>
            <p className="text-muted">
              Digite sua nova senha e confirme para redefinir sua senha e
              garantir a segurança da sua conta.
            </p>
            <form method="POST" onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-1" controlId="formBasicPassword">
                    <Form.Label className="fs-5 fw-bold">Senha</Form.Label>
                    <InputGroup className="mb-4">
                      <InputGroup.Text id="basic-addon1" className="p-2">
                        <i
                          className="bi bi-lock-fill"
                          style={{ color: "#CED4DB" }}
                        ></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Senha"
                        onChange={handleForm}
                        value={formValues.password}
                        className="ps-0"
                        controlId="formBasicPassword"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group
                    className="mb-1"
                    controlId="formBasicConfirmPassword"
                  >
                    <Form.Label className="fs-5 fw-bold">
                      Confirmar senha
                    </Form.Label>
                    <InputGroup className="mb-4">
                      <InputGroup.Text id="basic-addon1" className="p-2">
                        <i
                          className="bi bi-lock-fill"
                          style={{ color: "#CED4DB" }}
                        ></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar senha"
                        onChange={handleForm}
                        value={formValues.confirmPassword}
                        className="ps-0"
                        controlId="formBasicConfirmPassword"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button
                    className="btn btn-primary"
                    type="submit"
                    disabled={loading}
                    style={{
                      width: "auto",
                    }}
                  >
                    Redefinir
                    {loading && (
                      <Spinner
                        animation="grow"
                        variant="light"
                        className="py-2 fw-bold fs-4"
                      />
                    )}
                  </Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </div>
    </>
  );
}
