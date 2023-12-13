import React from "react";
import AfterAuth from "../../HOC/AfterAuth";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  InputGroup,
  Row,
} from "react-bootstrap";

const PurchasePlan = () => {
  return (
    <AfterAuth>
      <div className="mx-3 mx-md-5 mt-3 d-flex  align-items-center gap-4">
        <img className="d-none d-md-block" src="/assets/img/leftArrow.svg" />
        <h3 className="pt-2">Meu plano</h3>
      </div>
      <Card className="my-3 mx-3 mx-md-5 p-3 px-4">
        <div className="my-md-5 mx-md-5">
          <div className="d-flex align-items-center">
            <img className="shoppingImage" src="/assets/img/shopping.svg"></img>
            <div className="fw-bold fs-5 mx-1 ">Confirme sua compra:</div>
          </div>

          <Row>
            <Col sm={12} md={6}>
              <div className="d-flex mt-md-5 mt-4">
                <span className="d-flex align-items-center justify-content-center rounded-circle confirmYourPurchaseRound1And2">
                  1
                </span>
                <div className="d-flex align-items-center">
                  <span
                    className="mx-md-3 mx-2"
                    style={{
                      color: "#272B3080",
                      fontSize: "14px",
                    }}
                  >
                    DADOS PESSOAIS:
                  </span>
                </div>
              </div>
              <div className="mt-3 confirmYourPurchaseFrom">
                <Form>
                  <Form.Label style={{ fontSize: "14px", fontWeight: 700 }}>
                    NOME
                  </Form.Label>
                  <FormGroup>
                    <InputGroup className="mb-3 rounded">
                      <InputGroup.Text
                        id="basic-addon1"
                        className="border-0"
                        style={{
                          background: "#F4F6F8",
                        }}
                      ></InputGroup.Text>
                      <Form.Control
                        placeholder="digite seu nome completo"
                        type="text"
                        className="border-0 Cardinput badge-relative"
                        style={{
                          fontSize: "14px",
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                </Form>
                <Form>
                  <Form.Label style={{ fontSize: "14px", fontWeight: 700 }}>
                    E-MAIL
                  </Form.Label>
                  <FormGroup>
                    <InputGroup className="mb-3 rounded">
                      <InputGroup.Text
                        id="basic-addon1"
                        className="border-0"
                        style={{
                          background: "#F4F6F8",
                        }}
                      ></InputGroup.Text>
                      <Form.Control
                        placeholder="digite seu e-mail"
                        type="emailOrPhone"
                        className="border-0 Cardinput badge-relative"
                        style={{
                          fontSize: "14px",
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                </Form>
                <Form>
                  <Form.Label style={{ fontSize: "14px", fontWeight: 700 }}>
                    CPF/CNPJ
                  </Form.Label>
                  <FormGroup>
                    <InputGroup className="mb-3 rounded">
                      <InputGroup.Text
                        id="basic-addon1"
                        className="border-0"
                        style={{
                          background: "#F4F6F8",
                        }}
                      ></InputGroup.Text>
                      <Form.Control
                        placeholder="CPF/CNPJ"
                        type="text"
                        className="border-0 Cardinput badge-relative"
                        style={{
                          fontSize: "14px",
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                </Form>
                <Form>
                  <Form.Label style={{ fontSize: "14px", fontWeight: 700 }}>
                    CELULAR
                  </Form.Label>
                  <FormGroup>
                    <InputGroup className="mb-3 rounded">
                      <InputGroup.Text
                        id="basic-addon1"
                        className="border-0"
                        style={{
                          background: "#ECEFF3",
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <span style={{ fontSize: "14px", fontWeight: 900 }}>
                            +55
                          </span>
                          <i
                            className="bi bi-caret-down-fill ms-1 mt-1"
                            style={{ color: "#00000080" }}
                          ></i>
                        </div>
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="00 00000-0000"
                        type="text"
                        className="border-0 Cardinput badge-relative"
                        style={{
                          fontSize: "14px",
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                </Form>
              </div>
              <hr className="mt-md-5 mt-4" style={{ marginLeft: "30px" }} />

              <div className="d-flex mt-md-5 mt-2">
                <span className="d-flex align-items-center justify-content-center rounded-circle confirmYourPurchaseRound1And2">
                  2
                </span>
                <div className="d-flex align-items-center">
                  <span
                    className="mx-md-3 mx-2"
                    style={{
                      color: "#272B3080",
                      fontSize: "14px",
                    }}
                  >
                    DADOS DO PAGAMENTO
                  </span>
                </div>
              </div>
              <div className="mt-3 confirmYourPurchaseFrom">
                <h6 style={{ fontSize: "14px", fontWeight: 700 }}>
                  PAGAR COM:
                </h6>
                <h6
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#272B3080",
                  }}
                >
                  Escolha qual forma de pagamento você prefere usar.
                </h6>
                <div
                  className="d-flex position-relative"
                  style={{ width: "150px" }}
                >
                  <img
                    style={{ position: "absolute", right: 3, top: 1 }}
                    src="/assets/img/right.svg"
                  />
                  <Button
                    className="mt-2 border-success"
                    style={{
                      fontSize: "12px",
                      background: "#FBFBFB",
                      color: "#272B3080",
                    }}
                  >
                    <i
                      className="bi bi-credit-card me-1"
                      style={{ color: "#58A43D" }}
                    ></i>
                    Cartão de credito
                  </Button>
                </div>
              </div>
            </Col>
            <Col sm={12} md={6}>
              <div className="mt-md-5 mt-4 confirmYourPurchaseFrom">
                <h6
                  className="ms-md-4 pt-md-2"
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  DADOS DO CARTÃO
                </h6>
                <img
                  className="debitCardImage"
                  src="/assets/img/debitCard.svg"
                />
                <div className="ms-md-2 mt-3">
                  <span
                    className="ms-md-2"
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    BANDEIRAS ACEITAS
                  </span>
                  <div
                    className="d-flex align-items-center justify-content-around mt-1 py-md-2"
                    style={{
                      border: "1px solid #00000080",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      className="debitCardSymbolImage"
                      src="/assets/img/visaCard.svg"
                    />
                    <img
                      className="debitCardSymbolImage"
                      src="/assets/img/masterCard.svg"
                    />
                    <img
                      className="debitCardSymbolImage"
                      src="/assets/img/hiperCard.svg"
                    />
                    <img
                      className="debitCardSymbolImage"
                      src="/assets/img/americanExpress.svg"
                    />
                    <img
                      className="debitCardSymbolImage"
                      src="/assets/img/diners.svg"
                    />
                    <img
                      className="debitCardSymbolImage"
                      src="/assets/img/eloCard.svg"
                    />
                  </div>
                  <Form className="mt-2">
                    <Form.Label
                      className="ms-md-2 mt-3"
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                      }}
                    >
                      NÚMERO DO CARTÃO
                    </Form.Label>
                    <FormGroup>
                      <InputGroup className="mb-3 rounded">
                        <InputGroup.Text
                          id="basic-addon1"
                          className="border-0"
                          style={{
                            background: "#ECEFF3",
                          }}
                        ></InputGroup.Text>
                        <Form.Control
                          placeholder="digite o somente números do cartão"
                          type="text"
                          className="border-0 Cardinput badge-relative"
                          style={{
                            fontSize: "14px",
                          }}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Form>
                  <Form className="mt-2">
                    <Form.Label
                      className="ms-md-2"
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                      }}
                    >
                      NOME DO TITULAR
                    </Form.Label>
                    <FormGroup>
                      <InputGroup className="mb-3 rounded">
                        <InputGroup.Text
                          id="basic-addon1"
                          className="border-0"
                          style={{
                            background: "#ECEFF3",
                          }}
                        ></InputGroup.Text>
                        <Form.Control
                          placeholder="digite o nome completo impresso no cartão"
                          type="text"
                          className="border-0 Cardinput badge-relative pe-1"
                          style={{
                            fontSize: "14px",
                          }}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Form>
                  <Row>
                    <Col xs={6} md={6}>
                      <Form className="mt-md-2">
                        <Form.Label
                          className="ms-md-2"
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                          }}
                        >
                          VALIDADE
                        </Form.Label>
                        <div className="d-flex gap-2">
                          <div style={{ width: "50%" }}>
                            <FormGroup>
                              <InputGroup className="mb-3 rounded">
                                <Form.Control
                                  placeholder="mês"
                                  type="text"
                                  className="border-0 Cardinput badge-relative"
                                  style={{
                                    width: "100%",
                                    fontSize: "14px",
                                    textAlign: "center",
                                  }}
                                />
                              </InputGroup>
                            </FormGroup>
                          </div>
                          <div style={{ width: "50%", gap: "20px" }}>
                            <FormGroup>
                              <InputGroup className="mb-3 rounded">
                                <Form.Control
                                  placeholder="ano"
                                  type="text"
                                  className="border-0 Cardinput badge-relative"
                                  style={{
                                    fontSize: "14px",
                                    textAlign: "center",
                                  }}
                                />
                              </InputGroup>
                            </FormGroup>
                          </div>
                        </div>
                      </Form>
                    </Col>

                    <Col xs={6} md={6}>
                      <Form className="mt-md-2">
                        <Form.Label
                          className="ms-md-2"
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                          }}
                        >
                          CVC
                        </Form.Label>
                        <FormGroup>
                          <InputGroup
                            className="mb-3 rounded"
                            style={{ border: "1px solid #00000080" }}
                          >
                            <InputGroup.Text
                              id="basic-addon1"
                              style={{
                                background: "#ECEFF3",
                              }}
                            >
                              <i
                                className="bi bi-lock-fill ms-1 mt-1"
                                style={{ color: "#00000080" }}
                              ></i>
                            </InputGroup.Text>
                            <Form.Control
                              placeholder="digite o CVC do cartão"
                              type="password"
                              className="Cardinput badge-relative"
                              style={{
                                fontSize: "14px",
                              }}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>
                  <Form className="mt-2">
                    <Form.Label
                      className="ms-md-2"
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                      }}
                    >
                      parcelamento do cartão
                    </Form.Label>
                    <FormGroup>
                      <InputGroup className="mb-3 rounded">
                        <Form.Control
                          placeholder="1x de R$ 198,00"
                          type="text"
                          className="border-0 Cardinput badge-relative ps-3"
                          style={{
                            fontSize: "14px",
                          }}
                        />
                        <InputGroup.Text
                          id="basic-addon1"
                          className="border-0"
                          style={{
                            background: "#ECEFF3",
                          }}
                        >
                          <i
                            className="bi bi-caret-down-fill ms-1 mt-1"
                            style={{
                              color: "#00000080",
                            }}
                          ></i>
                        </InputGroup.Text>
                      </InputGroup>
                    </FormGroup>
                  </Form>
                </div>
                <hr style={{ marginTop: "30px" }} />
                <div className="d-flex justify-content-center">
                  <button
                    className="px-3 py-1 w-75"
                    style={{
                      background: "#0068FF",
                      color: "white",
                      border: "0",
                      borderRadius: "20px",
                      fontSize: "20px",
                      fontWeight: 700,
                    }}
                  >
                    Comprar agora
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </AfterAuth>
  );
};

export default PurchasePlan;
