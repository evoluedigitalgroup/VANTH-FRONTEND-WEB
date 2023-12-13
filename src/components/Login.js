import React, { useEffect, useState } from "react";
import { Col, FormGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDesignation, loginAdmin, registerAdmin } from "../helper/API/auth";
import LoginForm from "./Auth.js/LoginForm";
import RegisterForm from "./Auth.js/RegisterForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { jwtAtom, loginAtom } from "../recoil/Atoms";

const Login = () => {
  const [loginData, setLoginData] = useRecoilState(loginAtom);
  const [JWT, setJwt] = useRecoilState(jwtAtom);

  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [registerFormValues, setRegisterFormValues] = useState({
    code: "",
    designation: "",
    name: "",
    email: "",
    password: "",
  });
  // console.log('registerFormValues', registerFormValues)
  const Login = () => {
    setLogin(true);
    setAccount(false);
  };

  const Account = () => {
    setAccount(true);
    setLogin(false);
  };

  let navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login) {
      navigate("/Insights");
    }
  }, []);

  const hidePwd = () => {
    setHidePassword(!hidePassword);
  };

  const handleForm = (e) => {
    // console.log("handleForm", e.target.value);
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegisterForm = (e) => {
    // console.log("handleForm", e.target.value);
    setRegisterFormValues({
      ...registerFormValues,
      [e.target.name]: e.target.value,
    });
  };

  const ProLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    loginAdmin(formValues).then((res) => {
      // console.log("res", res);
      if (res.success) {
        setLoading(false);
        localStorage.setItem("login", true);
        setLoginData(res.data);
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.jwtTokens.accessToken)
        );
        setJwt(res.data.jwtTokens.accessToken);
        navigate("/Insights");
        toast.success(res.message);
      } else {
        setLoading(false);
        toast.error(res.message);
      }
    });
  };
  const registerUser = (event) => {
    setLoading(true);
    event.preventDefault();
    if (!registerFormValues.code) {
      toast.error("Por favor insira o código");
      setLoading(false);
    } else if (!registerFormValues.designation) {
      toast.error("Insira a designação");
      setLoading(false);
    } else if (!registerFormValues.name) {
      toast.error("Por favor, insira o nome");
      setLoading(false);
    } else if (!registerFormValues.email) {
      toast.error("Por favor, insira o e-mail");
      setLoading(false);
    } else if (!registerFormValues.password) {
      toast.error("Por favor, digite a senha");
      setLoading(false);
    } else if (!confirmPassword) {
      toast.error("Por favor, digite a senha de confirmação");
      setLoading(false);
    } else if (registerFormValues.password !== confirmPassword) {
      toast.error("Senha não corresponde");
      setLoading(false);
    } else {
      registerAdmin(registerFormValues).then((res) => {
        // console.log("res", res);
        if (res.success) {
          setLoading(false);
          Login();
          toast.success(res.message);
          navigate("/login");
          setRegisterFormValues({
            ...registerFormValues,
            designation: "",
          });
        } else {
          setLoading(false);
          toast.error(res.message);
        }
      });
    }
  };

  const getDesignaition = () => {
    const submitData = { code: registerFormValues.code };

    getDesignation(submitData).then((res) => {
      // console.log("res", res);
      if (res.success) {
        setRegisterFormValues({
          ...registerFormValues,
          designation: res.data.designation,
        });
      } else {
        toast.error(res.message);
      }
    });
  };

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

  return (
    <>
      <div className="Dashboard d-none d-md-flex align-items-center ">
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
            <Row>
              <Col md={3} sm={6} xs={4}>
                {login && (
                  <div className="login-enter fw-bold fs-4 actives">Entrar</div>
                )}
                {account && (
                  <div
                    className="login-enter fw-bold fs-4 inactive"
                    onClick={Login}
                  >
                    Entrar
                  </div>
                )}
              </Col>
              <Col md={9} sm={6} xs={6}>
                {login && (
                  <div
                    className="login-enter fw-bold fs-4 inactive"
                    onClick={Account}
                  >
                    Criar conta
                  </div>
                )}
                {account && (
                  <div className="login-enter fw-bold fs-4 actives">
                    Criar conta
                  </div>
                )}
              </Col>
            </Row>

            {login && (
              <LoginForm
                formValues={formValues}
                handleForm={handleForm}
                ProLogin={ProLogin}
                hidePassword={hidePassword}
                hidePwd={() => setHidePassword(!hidePassword)}
                loading={loading}
              />
            )}
            {account && (
              <RegisterForm
                handleRegisterForm={handleRegisterForm}
                registerUser={registerUser}
                hidePassword={hidePassword}
                hidePwd={() => setHidePassword(!hidePassword)}
                hideCnfrmPassword={hideConfirmPassword}
                hideCnfrmPwd={() =>
                  setHideConfirmPassword(!hideConfirmPassword)
                }
                registerFormValues={registerFormValues}
                setConfirmPassword={setConfirmPassword}
                confirmPassword={confirmPassword}
                loading={loading}
                getDesignaition={getDesignaition}
              />
            )}
          </Col>
        </Row>
      </div>

      <div className="d-md-none d-block">
        <img
          src="/assets/img/vancehDigital.svg"
          style={{ height: "248px", width: "372px" }}
        />
        <div className="mx-3">
          {login && (
            <>
              <h6
                className="actives"
                style={{ fontSize: 17, fontWeight: 900, width: "fit-content" }}
              >
                Acessar
              </h6>
              <h6 style={{ fontSize: 12, fontWeight: 600 }}>
                Digite seu e-mail e senha para entrar ou cadastre-se
              </h6>
              <Form>
                <FormGroup>
                  <Form.Label
                    className="mt-3"
                    style={{ fontSize: 12, fontWeight: 500 }}
                  >
                    Email
                  </Form.Label>
                  <InputGroup className="rounded-2">
                    <InputGroup.Text
                      id="basic-addon1"
                      className="p-2 border-0 rounded"
                    >
                      <i
                        className="bi bi-envelope-fill"
                        style={{ color: "#CED4DB" }}
                      ></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="Email cadastrado"
                      className="border-0 ps-0"
                      controlId="formBasicEmail"
                      style={{ fontSize: 13 }}
                    />
                  </InputGroup>
                </FormGroup>
              </Form>
              <Form>
                <FormGroup>
                  <Form.Label
                    className="mt-3"
                    style={{ fontSize: 12, fontWeight: 500 }}
                  >
                    Senha
                  </Form.Label>
                  <InputGroup className="rounded-2">
                    <InputGroup.Text
                      id="basic-addon1"
                      className="p-2 border-0 rounded"
                    >
                      <i
                        className="bi bi-lock-fill"
                        style={{ color: "#CED4DB" }}
                      ></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="email"
                      placeholder="Senha"
                      className="border-0 ps-0"
                      controlId="formBasicEmail"
                      style={{ fontSize: 13 }}
                    />
                  </InputGroup>
                </FormGroup>
              </Form>

              <div className="d-flex align-items-center justify-content-between">
                <Form.Group className="my-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Lembrar"
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "rgba(39, 43, 48, 1)",
                    }}
                  />
                </Form.Group>
                <span
                  style={{ fontSize: 12, fontWeight: 600, color: "#0068FF" }}
                >
                  Esqueci minha senha
                </span>
              </div>
              <Row>
                <Col xs={6} md={6}>
                  <Button
                    className="px-5 py-2"
                    type="submit"
                    // disabled={loading}
                    onClick={Account}
                    style={{
                      width: "100%",
                      color: "#0068FF",
                      backgroundColor: "white",
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    Cadastrar
                    {/* {loading && (
								<Spinner
									animation='grow'
									variant='light'
									className='ms-3 py-2 fw-bold fs-4'
								/>
							)} */}
                  </Button>
                </Col>
                <Col xs={6} md={6}>
                  <Button
                    className="login-btn px-5 py-2 border-0 text-center"
                    type="submit"
                    onClick={Login}
                    style={{
                      width: "100%",
                      color: "#FFF5F1",
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    Enviar
                    {/* {loading && (
								<Spinner
									animation='grow'
									variant='light'
									className='ms-3 py-2 fw-bold fs-4'
								/>
							)} */}
                  </Button>
                </Col>
              </Row>
            </>
          )}
          {account && (
            <>
              <h6
                className="actives"
                style={{ fontSize: 17, fontWeight: 900, width: "fit-content" }}
              >
                Criar conta
              </h6>

              <Row className="mt-3">
                <Col xs={4}>
                  {company && (
                    <h6
                      className="actives"
                      style={{
                        fontSize: 17,
                        fontWeight: 900,
                        width: "fit-content",
                      }}
                    >
                      Empresa
                    </h6>
                  )}
                  {member && (
                    <h6
                      className="inactive"
                      onClick={Company}
                      style={{
                        fontSize: 17,
                        fontWeight: 900,
                        width: "fit-content",
                      }}
                    >
                      Empresa
                    </h6>
                  )}
                </Col>
                <Col xs={8}>
                  {company && (
                    <h6
                      className="inactive"
                      onClick={Member}
                      style={{
                        fontSize: 17,
                        fontWeight: 900,
                        width: "fit-content",
                      }}
                    >
                      Membro
                    </h6>
                  )}
                  {member && (
                    <h6
                      className="actives"
                      style={{
                        fontSize: 17,
                        fontWeight: 900,
                        width: "fit-content",
                      }}
                    >
                      Membro
                    </h6>
                  )}
                </Col>
              </Row>

              {company && (
                <>
                  <Form>
                    <FormGroup>
                      <Form.Label
                        className="mt-3"
                        style={{ fontSize: 12, fontWeight: 500 }}
                      >
                        nome da empresa
                      </Form.Label>
                      <InputGroup className="rounded-2">
                        <InputGroup.Text className="p-2 border-0 rounded">
                          <i
                            className="bi bi-hash"
                            style={{ color: "#CED4DB" }}
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="O nome da sua empresa"
                          type="text"
                          className="border-0 ps-0"
                          style={{ fontSize: 13 }}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Form>
                  <Form>
                    <FormGroup>
                      <Form.Label
                        className="mt-3"
                        style={{ fontSize: 12, fontWeight: 500 }}
                      >
                        Nome
                      </Form.Label>
                      <InputGroup className="rounded-2">
                        <InputGroup.Text className="p-2 border-0 rounded">
                          <i
                            className="bi bi-person-fill"
                            style={{ color: "#CED4DB" }}
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Seu primeiro e último nome"
                          type="text"
                          className="border-0 ps-0"
                          style={{ fontSize: 13 }}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Form>
                  <Form>
                    <FormGroup>
                      <Form.Label
                        className="mt-3"
                        style={{ fontSize: 12, fontWeight: 500 }}
                      >
                        E-mail
                      </Form.Label>
                      <InputGroup className="rounded-2">
                        <InputGroup.Text className="p-2 border-0 rounded">
                          <i
                            className="bi bi-envelope-fill"
                            style={{ color: "#CED4DB" }}
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="E-mail"
                          type="text"
                          className="border-0 ps-0"
                          style={{ fontSize: 13 }}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Form>
                  <Form>
                    <FormGroup>
                      <Form.Label
                        className="mt-3"
                        style={{ fontSize: 12, fontWeight: 500 }}
                      >
                        Senha
                      </Form.Label>
                      <InputGroup className="rounded-2">
                        <InputGroup.Text className="p-2 border-0 rounded">
                          <i
                            className="bi bi-lock-fill"
                            style={{ color: "#CED4DB" }}
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Sua senha"
                          type="text"
                          className="border-0 ps-0"
                          style={{ fontSize: 13 }}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Form>
                  <div className="d-flex align-items-center justify-content-between">
                    <Form.Group className="my-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Lembrar"
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: "rgba(39, 43, 48, 1)",
                        }}
                      />
                    </Form.Group>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#272B30",
                      }}
                    >
                      Esqueci minha senha
                    </span>
                  </div>
                  <Row className="mb-3">
                    <Col xs={6} md={6}>
                      <Button
                        className="px-5 py-2"
                        type="submit"
                        // disabled={loading}
                        onClick={Login}
                        style={{
                          width: "100%",
                          color: "#0068FF",
                          backgroundColor: "white",
                          fontSize: 13,
                          fontWeight: 800,
                        }}
                      >
                        Entrar
                        {/* {loading && (
              <Spinner
                animation='grow'
                variant='light'
                className='ms-3 py-2 fw-bold fs-4'
              />
            )} */}
                      </Button>
                    </Col>
                    <Col xs={6} md={6}>
                      <Button
                        className="login-btn px-5 py-2 border-0 text-center"
                        type="submit"
                        onClick={Account}
                        style={{
                          width: "100%",
                          color: "#FFF5F1",
                          fontSize: 13,
                          fontWeight: 800,
                        }}
                      >
                        Cadastrar
                        {/* {loading && (
              <Spinner
                animation='grow'
                variant='light'
                className='ms-3 py-2 fw-bold fs-4'
              />
            )} */}
                      </Button>
                    </Col>
                  </Row>
                </>
              )}

              {member && (
                <>
                  <Form>
                    <FormGroup>
                      <Form.Label
                        className="mt-3"
                        style={{ fontSize: 12, fontWeight: 500 }}
                      >
                        Código para criação
                      </Form.Label>
                      <InputGroup className="rounded-2">
                        <InputGroup.Text className="p-2 border-0 rounded">
                          <i
                            className="bi bi-hash"
                            style={{ color: "#CED4DB" }}
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder=" Código que você recebeu"
                          type="text"
                          className="border-0 ps-0"
                          style={{ fontSize: 13 }}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Form>
                  <Form>
                    <FormGroup>
                      <Form.Label
                        className="mt-3"
                        style={{ fontSize: 12, fontWeight: 500 }}
                      >
                        Seu cargo
                      </Form.Label>
                      <InputGroup className="rounded-2">
                        <InputGroup.Text className="p-2 border-0 rounded">
                          <i
                            className="bi bi-bag-dash-fill"
                            style={{ color: "#CED4DB" }}
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Sua função"
                          type="text"
                          className="border-0 ps-0"
                          style={{ fontSize: 13 }}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Form>
                  <Form>
                    <FormGroup>
                      <Form.Label
                        className="mt-3"
                        style={{ fontSize: 12, fontWeight: 500 }}
                      >
                        Nome
                      </Form.Label>
                      <InputGroup className="rounded-2">
                        <InputGroup.Text className="p-2 border-0 rounded">
                          <i
                            className="bi bi-bag-dash-fill"
                            style={{ color: "#CED4DB" }}
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Seu primeiro e último nome"
                          type="text"
                          className="border-0 ps-0"
                          style={{ fontSize: 13 }}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Form>
                  <Form>
                    <FormGroup>
                      <Form.Label
                        className="mt-3"
                        style={{ fontSize: 12, fontWeight: 500 }}
                      >
                        E-mail
                      </Form.Label>
                      <InputGroup className="rounded-2">
                        <InputGroup.Text className="p-2 border-0 rounded">
                          <i
                            className="bi bi-envelope-fill"
                            style={{ color: "#CED4DB" }}
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="E-mail"
                          type="text"
                          className="border-0 ps-0"
                          style={{ fontSize: 13 }}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Form>
                  <Form>
                    <FormGroup>
                      <Form.Label
                        className="mt-3"
                        style={{ fontSize: 12, fontWeight: 500 }}
                      >
                        Senha
                      </Form.Label>
                      <InputGroup className="rounded-2">
                        <InputGroup.Text className="p-2 border-0 rounded">
                          <i
                            className="bi bi-lock-fill"
                            style={{ color: "#CED4DB" }}
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Sua senha"
                          type="text"
                          className="border-0 ps-0"
                          style={{ fontSize: 13 }}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Form>
                  <Form>
                    <FormGroup>
                      <Form.Label
                        className="mt-3"
                        style={{ fontSize: 12, fontWeight: 500 }}
                      >
                        Repetir senha
                      </Form.Label>
                      <InputGroup className="rounded-2">
                        <InputGroup.Text className="p-2 border-0 rounded">
                          <i
                            className="bi bi-lock-fill"
                            style={{ color: "#CED4DB" }}
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Sua senha"
                          type="text"
                          className="border-0 ps-0"
                          style={{ fontSize: 13 }}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Form>
                  <div className="d-flex align-items-center justify-content-between">
                    <Form.Group className="my-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Lembrar"
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: "rgba(39, 43, 48, 1)",
                        }}
                      />
                    </Form.Group>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#272B30",
                      }}
                    >
                      Esqueci minha senha
                    </span>
                  </div>
                  <Row className="mb-3">
                    <Col xs={6} md={6}>
                      <Button
                        className="px-5 py-2"
                        type="submit"
                        // disabled={loading}
                        onClick={Login}
                        style={{
                          width: "100%",
                          color: "#0068FF",
                          backgroundColor: "white",
                          fontSize: 13,
                          fontWeight: 800,
                        }}
                      >
                        Entrar
                        {/* {loading && (
              <Spinner
                animation='grow'
                variant='light'
                className='ms-3 py-2 fw-bold fs-4'
              />
            )} */}
                      </Button>
                    </Col>
                    <Col xs={6} md={6}>
                      <Button
                        className="login-btn px-5 py-2 border-0 text-center"
                        type="submit"
                        onClick={Account}
                        style={{
                          width: "100%",
                          color: "#FFF5F1",
                          fontSize: 13,
                          fontWeight: 800,
                        }}
                      >
                        Cadastrar
                        {/* {loading && (
              <Spinner
                animation='grow'
                variant='light'
                className='ms-3 py-2 fw-bold fs-4'
              />
            )} */}
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
