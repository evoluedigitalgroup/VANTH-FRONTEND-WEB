import React from "react";
import { Button, Form, InputGroup, Nav, Navbar } from "react-bootstrap";
import { showTutorialAtom } from "../../recoil/Atoms";
import { useRecoilState } from "recoil";
import { isMobile } from "react-device-detect";

const TableNavbar = ({
  children,
  title,
  setSearch,
  refresh,
  setRefresh,
  search,
}) => {
  const onClose = () => {
    setSearch("");
    setRefresh(refresh + 1);
  };
  const [tutorialValue, setTutorialValue] = useRecoilState(showTutorialAtom);
  return (
    <div>
      <Navbar className="my-2 px-2 ps-1" expand="lg">
        <Navbar.Brand className="fw-bolder">{title}</Navbar.Brand>
        <Navbar.Toggle
          id="navBarToggle"
          aria-controls="navbarScroll"
          onClick={() => {
            isMobile
              ? setTutorialValue({ ...tutorialValue, index: 10 })
              : console.log();
          }}
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <InputGroup className="rounded-2">
              <InputGroup.Text
                id="basic-addon1"
                className="border-0"
                style={{ background: "#F4F4F4" }}
              >
                <i className="bi bi-search"></i>
              </InputGroup.Text>

              <Form.Control
                type="search"
                placeholder="Procurar...."
                aria-label="Search"
                aria-describedby="basic-addon1"
                className="border-0 ps-0"
                value={search}
                name="search"
                onChange={(e) => setSearch(e.target.value)}
              />
              {!search == "" && (
                <InputGroup.Text
                  onClick={onClose}
                  id="basic-addon2"
                  className="border-0"
                >
                  <i className="bi bi-x"></i>
                </InputGroup.Text>
              )}
            </InputGroup>
          </Nav>
          {children}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default TableNavbar;
