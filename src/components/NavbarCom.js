import React, { useEffect } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { profileData } from "../pages/Login/Profile";
import { profileAtom, showTutorialAtom } from "../recoil/Atoms";
import { isMobile } from "react-device-detect";

const NavbarCom = ({ setShowSide, showSide }) => {
  const [profileItem, setProfileItem] = useRecoilState(profileAtom);
  const [tutorialValue, setTutorialValue] = useRecoilState(showTutorialAtom);
  useEffect(() => {
    profileData().then((res) => {
      if (res.success) {
        setProfileItem(res.data);
      }
    });
  }, []);

  let pathName = window.location.pathname;

  return (
    <>
      <Navbar className="nav p-0">
        <Row className="w-100 p-0 m-0">
          <Col md={2} lg={2} sm={1} xs={3} className="bg-white">
            <Navbar.Brand
              href="#home"
              className="ps-0 d-md-flex align-items-center h-100 w-100 justify-content-center d-none"
            >
              <img
                // style={{ width: "300px" }}
                src="/assets/img/vancehDigital1.svg"
              ></img>
            </Navbar.Brand>
            <div
              id="menuList"
              onClick={() => {
                if (tutorialValue?.index == 7) {
                  console.log("click 7 index", tutorialValue?.index);
                  setTutorialValue({ ...tutorialValue, index: 8 });
                } else if (tutorialValue?.index == 13) {
                  setTutorialValue({ ...tutorialValue, index: 14 });
                } else if (tutorialValue?.index == 22) {
                  setTutorialValue({ ...tutorialValue, index: 23 });
                } else {
                  setTutorialValue({ ...tutorialValue, index: 5 });
                }
                setShowSide(!showSide);
              }}
              className="ps-0 d-flex align-items-center h-100 justify-content-center d-md-none"
            >
              <img
                src="/assets/img/menuList.svg"
                style={{ width: "32px" }}
              ></img>
            </div>
          </Col>
          <Col md={10} lg={10} sm={10} xs={9} className="py-1">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Navbar.Brand className="ps-0 d-md-none align-items-center justify-content-center">
                <img src="/assets/img/vancehDigital1.svg"></img>
              </Navbar.Brand>
              <Nav className="me-auto"></Nav>
              <Nav className="mx-md-1 mx-md-5 px-md-3">
                <NavLink style={{ textDecoration: "none" }} to={"/profile"}>
                  <div
                    id="profile"
                    className={`${
                      pathName == "/profile" && "Nav-after"
                    } text-white d-flex align-items-center`}
                    onClick={() => {
                      isMobile
                        ? setTutorialValue({ ...tutorialValue, index: 18 })
                        : setTutorialValue({ ...tutorialValue, index: 14 });
                    }}
                  >
                    <span className="d-none d-md-flex me-2">
                      {profileItem?.name}
                    </span>
                    <i
                      className="bi bi-bell-fill d-flex d-md-none me-2"
                      style={{ color: "#6F767E", fontSize: 16 }}
                    ></i>
                    <NavLink to={"/profile"}>
                      <img
                        className={`${pathName == "/profile" && "Imgborder"}`}
                        src={
                          profileItem.profileImage
                            ? profileItem.profileImage
                            : "/assets/img/noUser.png"
                        }
                        alt=""
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "50%",
                          objectFit: "contain",
                        }}
                      />
                    </NavLink>
                  </div>
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Navbar>
    </>
  );
};

export default NavbarCom;
