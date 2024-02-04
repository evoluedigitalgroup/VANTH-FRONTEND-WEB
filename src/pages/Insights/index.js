import React, { forwardRef, useEffect, useState } from "react";
import moment from "moment";
import Nav from "react-bootstrap/Nav";
import pt from "date-fns/locale/pt-BR";
import Card from "react-bootstrap/Card";
import DatePicker from "react-datepicker";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { Link, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { toast } from "react-toastify";

import { getContactList } from "../Clients/api";
import Loader from "../../components/Loader";

import AfterAuth from "../../HOC/AfterAuth";
import Barchart1 from "./CHARTS/Barchart1";
import Linechart from "./CHARTS/Linechart";
import Linechart1 from "./CHARTS/Linechart1";
import Barchart from "./CHARTS/Barchart";
import InsightTable from "./CHARTS/InsightTable";
import NewLinechart from "./CHARTS/NewLinechart1";
import NewBarChartVisitor from "./CHARTS/NewBarchart";
import Sidebar from "../../components/Sidebar";
import NavbarCom from "../../components/NavbarCom";
import { getChartData } from "../../helper/API/insight";
import { getAllChartData, loginAtom } from "../../recoil/Atoms";
import { Helmet } from "react-helmet";


const Insights = () => {
  registerLocale("pt-BR", pt);
  const [active, setActive] = useState({
    month: true,
    year: false,
    week: false,
    date: false,
  });
  const login = useRecoilValue(loginAtom);
  const permissions = login?.permissions;
  const [status, setStatus] = useState("monthly");
  const [open, setOpen] = useState(true);
  const [tableRow, setTableRow] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  const [recoilChartData, setRecoilChartData] = useRecoilState(getAllChartData);
  useEffect(() => {
    setCardLoading(true);
    const submitData = { filter: status };
    getChartData(submitData).then((res) => {
      if (res.success) {
        setCardLoading(false);
        setRecoilChartData({
          ...res.data,
          chartDataStatus: status,
        });
      } else {
        setCardLoading(false);
      }
    });
  }, [status]);
  useEffect(() => {
    setLoading(true);
    const submitData = {
      search: "",
    };
    getContactList(submitData).then((res) => {
      if (res.success) {
        setTableRow(res.data.findData);
        setLoading(false);
      } else {
        setTableRow([]);
        setLoading(false);
      }
    });
  }, [refresh]);

  const handleToggle = (status) => {
    setCardLoading(true);
    if (status === "monthly") {
      setStatus(status);
      setActive({
        month: true,
        year: false,
        week: false,
        date: false,
      });
      setCardLoading(false);
    } else if (status === "yearly") {
      setStatus(status);
      setActive({
        month: false,
        year: true,
        week: false,
        date: false,
      });
      setCardLoading(false);
    } else if (status === "week") {
      // setStatus(status)
      setStatus(status);
      setActive({
        month: false,
        year: false,
        week: true,
        date: false,
      });
      setCardLoading(false);
    } else if (status === "date") {
      setStatus(status);
      setRecoilChartData({
        ...recoilChartData,
        chartDataStatus: status,
      });
      setActive({
        month: false,
        year: false,
        week: false,
        date: true,
      });
      setCardLoading(false);
    } else {
      return setCardLoading(false);
    }
  };
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
  };
  const handleCalendarClose = () => {
    const submitData = {
      filter: {
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: moment(endDate).format("YYYY-MM-DD"),
      },
    };

    const diffTime = Math.abs(new Date(startDate) - new Date(endDate));

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (
      !submitData?.filter?.startDate ||
      submitData?.filter?.startDate === "Invalid date" ||
      !submitData?.filter?.endDate ||
      submitData?.filter?.endDate === "Invalid date" ||
      submitData?.filter?.startDate === submitData?.filter?.endDate
    ) {
      toast.error("Please select proper date");
    } else if (diffDays >= 30) {
      toast.error("Please  select only 30 days");
    } else {
      getChartData(submitData).then((res) => {
        if (res.success) {
          setCardLoading(false);
          setStartDate(new Date());
          setEndDate(null);
          setRecoilChartData({
            ...res.data,
            chartDataStatus: status,
          });
        } else {
          setCardLoading(false);
        }
      });
    }
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div onClick={(e) => handleToggle("date")}>
      <Button
        className={`fs-color  mx-1 example-custom-input border-class ${active.date ? "activeBtnTable" : "inActiveBtnTable"
          }`}
        style={{ border: "5px solid #000 !important" }}
        onClick={onClick}
        ref={ref}
      >
        <i
          className="bi bi-calendar-fill fs-color"
          onClick={(e) => handleToggle("date")}
        ></i>
      </Button>
    </div>
  ));
  return (
    <>
      <Helmet>
        <title>Vanth System | Insigths</title>
      </Helmet>
      <AfterAuth>
        <h2 className="mt-3 mx-md-5 mx-4 fw-bold">Insigths</h2>
        <Card className="p-4 pt-0 pt-md-4 mx-md-5 my-3 cardComponent">
          <Row>
            <Navbar expand="lg">
              <Container fluid>
                <Navbar.Brand className="fw-bolder" href="#">
                  <p className="fw-bolder">Visitas ao site</p>
                  <p className=" fs-color">
                    {recoilChartData?.reqDate?.startingDate}-{" "}
                    {recoilChartData?.reqDate?.endingDate}
                  </p>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  {/* searchbar */}
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: "100px" }}
                    navbarScroll
                  >
                    <InputGroup></InputGroup>
                  </Nav>
                  <Button
                    className={`fs-color  mx-1 border-0 ${active.year ? "activeBtnTable" : "inActiveBtnTable"
                      }`}
                    onClick={(e) => handleToggle("yearly")}
                  >
                    Ano
                  </Button>
                  <Button
                    className={`fs-color  mx-1 border-0 ${active.month ? "activeBtnTable" : "inActiveBtnTable"
                      }`}
                    onClick={(e) => handleToggle("monthly")}
                  >
                    Mês
                  </Button>
                  <Button
                    className={`fs-color  mx-1 border-0 ${active.week ? "activeBtnTable" : "inActiveBtnTable"
                      }`}
                    onClick={(e) => handleToggle("week")}
                  >
                    Semana
                  </Button>
                  <div className="vr" />
                  <div
                    style={{
                      border: "1px solid #DCDFE6 !important",
                    }}
                  >
                    {open && (
                      <DatePicker
                        style={{ color: "#FC671A" }}
                        className="border-1"
                        selected={startDate}
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        locale="pt-BR"
                        maxDate={new Date()}
                        // minDate={
                        // 	new Date(
                        // 		startDate.setDate(30)
                        // 	)
                        // }
                        onCalendarClose={handleCalendarClose}
                        // onCalendarOpen={handleCalendarOpen}
                        selectsRange
                        selectsDisabledDaysInRange
                        customInput={<ExampleCustomInput />}
                      >
                        {/* <div
												className='text-end m-3'
												style={{ color: "red" }}>
												<button
													variant='primary'
													className='btn btn-primary px-1 py-0'>
													Aplicar
												</button>
											</div> */}
                      </DatePicker>
                    )}
                  </div>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Row>
          {/* charts */}
          <></>
          {cardLoading ? (
            <Loader />
          ) : (
            <>
              <Row className="my-3">
                <Col md={6}>
                  <Card>
                    <Row className="p-3">
                      <Col xs={12} sm={12} md={6} className="text-center">
                        <Row className="pt-3">
                          <Col
                            xs={5}
                            md={5}
                            className="d-flex justify-content-md-center justify-content-end"
                          >
                            <img
                              className="graphFirstImg"
                              src="/assets/img/newEye.svg"
                            // style={{
                            //   height: "5rem",
                            //   width: "5rem",
                            // }}
                            />
                          </Col>
                          <Col
                            xs={7}
                            md={7}
                            className="d-flex justify-content-md-center"
                          >
                            <h6
                              className="fs-color mb-0"
                              style={{
                                fontSize: "12px",
                              }}
                            >
                              Total de visitas
                              <p className="fs-color-fill px-0">
                                {recoilChartData?.totalVisitor}
                              </p>
                            </h6>
                          </Col>
                        </Row>
                      </Col>
                      {/* linechart left */}
                      <Col
                        xs={12}
                        sm={12}
                        md={6}
                        className=" justify-content-center align-items-center"
                      >
                        <Linechart />
                        {recoilChartData?.growth?.visitor && (
                          <div className="d-flex justify-content-center">
                            <div
                              className="px-3 fw-bold d-flex align-items-center border-chart-label1"
                              style={{
                                color:
                                  recoilChartData?.growth?.visitorIndication ===
                                    "increment"
                                    ? "#58A43D"
                                    : "#A43D3D",
                              }}
                            >
                              {recoilChartData?.growth?.visitorIndication ===
                                "increment" ? (
                                <img src="/assets/img/up.png" className="px-1" />
                              ) : (
                                <img
                                  src="/assets/img/down.png"
                                  className="px-1"
                                />
                              )}
                              {recoilChartData?.growth?.visitor.split(" ")[0]}
                            </div>{" "}
                            <div
                              className="border-chart-label2"
                              style={{
                                color: "#6F767E",
                              }}
                            >
                              {recoilChartData?.growth?.visitor.slice(
                                recoilChartData?.growth?.visitor.indexOf(" ") +
                                1
                              )}
                            </div>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Card>
                  {/* )} */}
                </Col>
                {/* second card */}
                <Col md={6}>
                  {/* barchart right */}
                  <Card className="p-3 mt-4 mt-md-0">
                    <Barchart1 />
                  </Card>
                </Col>
              </Row>
              <div className="mt-3">
                <span style={{ fontWeight: 700 }}>Documentos</span>
              </div>
              <Row className="my-3">
                {/* third card */}
                <Col md={6}>
                  <Card>
                    <Row className="p-3">
                      <Col xs={12} sm={12} md={6} className="text-center">
                        <Row className="pt-3">
                          <Col
                            xs={5}
                            md={5}
                            className="d-flex justify-content-md-center justify-content-end"
                          >
                            <img
                              className="graphFirstImg"
                              src="/assets/img/newFile.svg"
                            // style={{
                            //   height: "5rem",
                            //   width: "5rem",
                            // }}
                            />
                          </Col>
                          <Col
                            xs={7}
                            md={7}
                            className="d-flex justify-content-md-center"
                          >
                            <h6
                              className="fs-color  mb-0"
                              style={{
                                fontSize: "12px",
                              }}
                            >
                              Total de documentos
                              <p className="fs-color-fill px-0">
                                {recoilChartData?.totalContact}
                              </p>
                            </h6>
                          </Col>
                        </Row>
                      </Col>
                      {/* linechart left */}
                      <Col
                        xs={12}
                        sm={12}
                        md={6}
                        className="justify-content-center align-items-center"
                      >
                        <NewLinechart />

                        {recoilChartData?.growth?.contact && (
                          <div className="d-flex justify-content-center">
                            <div
                              className="px-3 fw-bold d-flex align-items-center border-chart-label1"
                              style={{
                                color:
                                  recoilChartData?.growth?.contactIndication ===
                                    "increment"
                                    ? "#58A43D"
                                    : "#A43D3D",
                              }}
                            >
                              {recoilChartData?.growth?.contactIndication ===
                                "increment" ? (
                                <img src="/assets/img/up.png" className="px-1" />
                              ) : (
                                <img
                                  src="/assets/img/down.png"
                                  className="px-1"
                                />
                              )}
                              {recoilChartData?.growth?.contact.split(" ")[0]}
                            </div>{" "}
                            <div
                              className="border-chart-label2"
                              style={{
                                color: "#6F767E",
                              }}
                            >
                              {recoilChartData?.growth?.contact.slice(
                                recoilChartData?.growth?.contact.indexOf(" ") +
                                1
                              )}
                            </div>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Card>
                </Col>
                {/* fourth card */}
                <Col md={6}>
                  {/* barchart right */}
                  <Card className="p-3 mt-4 mt-md-0">
                    <NewBarChartVisitor />
                  </Card>
                </Col>
              </Row>
              <div className="mt-3">
                <span style={{ fontWeight: 700 }}>Contratos</span>
              </div>
              <Row className="my-3">
                {/* third card */}
                <Col md={6}>
                  <Card>
                    <Row className="p-3">
                      <Col xs={12} sm={12} md={6} className="text-center">
                        <Row className="pt-3">
                          <Col
                            xs={5}
                            md={5}
                            className="d-flex justify-content-md-center justify-content-end"
                          >
                            <img
                              className="graphFirstImg"
                              src="/assets/img/newFile.svg"
                            // style={{
                            //   height: "5rem",
                            //   width: "5rem",
                            // }}
                            />
                          </Col>
                          <Col
                            xs={7}
                            md={7}
                            className="d-flex justify-content-md-center"
                          >
                            <h6
                              className="fs-color  mb-0"
                              style={{
                                fontSize: "12px",
                              }}
                            >
                              Total de contatos
                              <p className="fs-color-fill px-0">
                                {recoilChartData?.totalContact}
                              </p>
                            </h6>
                          </Col>
                        </Row>
                      </Col>
                      {/* linechart left */}
                      <Col
                        xs={12}
                        sm={12}
                        md={6}
                        className="justify-content-center align-items-center   "
                      >
                        <Linechart1 />

                        {recoilChartData?.growth?.contact && (
                          <div className="d-flex justify-content-center">
                            <div
                              className="px-3 fw-bold d-flex align-items-center border-chart-label1"
                              style={{
                                color:
                                  recoilChartData?.growth?.contactIndication ===
                                    "increment"
                                    ? "#58A43D"
                                    : "#A43D3D",
                              }}
                            >
                              {recoilChartData?.growth?.contactIndication ===
                                "increment" ? (
                                <img src="/assets/img/up.png" className="px-1" />
                              ) : (
                                <img
                                  src="/assets/img/down.png"
                                  className="px-1"
                                />
                              )}
                              {recoilChartData?.growth?.contact.split(" ")[0]}
                            </div>{" "}
                            <div
                              className="border-chart-label2"
                              style={{
                                color: "#6F767E",
                              }}
                            >
                              {recoilChartData?.growth?.contact.slice(
                                recoilChartData?.growth?.contact.indexOf(" ") +
                                1
                              )}
                            </div>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Card>
                </Col>
                {/* fourth card */}
                <Col md={6}>
                  {/* barchart right */}
                  <Card className="p-3 mt-4 mt-md-0">
                    <Barchart />
                  </Card>
                </Col>
              </Row>
            </>
          )}
          {/* tabels */}
          {permissions?.contact ? (
            loading ? (
              <Loader />
            ) : (
              <InsightTable
                tableRow={tableRow}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            )
          ) : (
            ""
          )}
          <div className="text-md-end text-center mx-2">
            <Button
              className="px-5 shadow  py-2"
              style={{
                backgroundColor: "#C4CCD2",
                border: "none",
              }}
            >
              <Link
                to="/contratos"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                Ver tudo
              </Link>
            </Button>
          </div>
        </Card>
      </AfterAuth>
    </>
  );
};

export default Insights;
