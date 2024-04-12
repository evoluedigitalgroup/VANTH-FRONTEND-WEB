import { useNavigate, useParams } from "react-router-dom";
import { Col, Row, Spinner, Form, InputGroup, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { forgotPassword, resetPassword } from "../../helper/API/auth";
import { toast } from "react-toastify";

export function ForgotPassword() {
  const [formValues, setFormValues] = useState({
    email: "",
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

    forgotPassword(formValues)
      .then((response) => {
        console.log(response);
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error("Erro ao solicitar redefinição de senha");
        }
      })
      .catch((error) => {
        toast.error("Erro ao solicitar redefinição de senha");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Helmet>
        <title>Vanth System | Redefinição de senha</title>
      </Helmet>
      <div className="Dashboard d-none d-md-flex align-items-center" style={{
        backgroundImage: "url(/assets/backgrounds/forgot-password.png)",
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
            <h4 className="fw-bold fs-4">Esqueceu sua senha?</h4>
            <p className="text-muted">
              Digite seu e-mail e enviaremos um link para redefinir sua senha e
              permitir que você acesse sua conta novamente.
            </p>
            <form method="POST" onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Label className="fs-5 fw-bold">E-mail</Form.Label>
                    <InputGroup className="mb-4">
                      <InputGroup.Text id="basic-addon1" className="p-2">
                        <i
                          className="bi bi-envelope-fill"
                          style={{ color: "#CED4DB" }}
                        ></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        onChange={handleForm}
                        value={formValues.email}
                        className="ps-0"
                        controlId="formBasicEmail"
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
                    Solicitar redefinição
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
