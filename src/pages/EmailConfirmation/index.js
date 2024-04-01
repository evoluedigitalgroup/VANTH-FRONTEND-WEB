import { useParams } from "react-router-dom";
import { Col, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { emailConfirmation } from "../../helper/API/auth";
import { useState, useEffect } from "react";

export function EmailConfirmation() {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    emailConfirmation({ token })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Vanth System | Confirmação de email</title>
      </Helmet>
      <div className="Dashboard d-none d-md-flex align-items-center">
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
            {loading ? (
              <Spinner
                animation="grow"
                variant="light"
                className="ms-3 py-2 fw-bold fs-4"
              />
            ) : (
              <>
                <h4 className="fw-bold fs-4">
                  {error
                    ? "Erro ao confirmar email"
                    : "Email confirmado com sucesso"}
                </h4>
                <p className="text-muted">
                  {error
                    ? "Ocorreu um erro no processo de confirmação de email, verifique se o link está correto ou se o email já foi confirmado"
                    : "Seu email foi confirmado com sucesso, você já pode acessar sua conta e aproveitar nossos serviços"}
                </p>
                <div className="d-flex justify-content-end">
                  <a href="/login" className="btn btn-primary">
                    {error ? "Voltar para a tela de login" : "Acessar minha conta"}
                  </a>
                </div>
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}
