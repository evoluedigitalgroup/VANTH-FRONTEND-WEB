import React, { useState } from "react";
import AfterAuth from "../HOC/AfterAuth";
import { Button, Card, Table } from "react-bootstrap";
import TableNavbar from "../components/TableNavbar";
import NewClientAdd from "../components/Document/NewClientAdd";

const Clients = () => {
  const [active, setActive] = useState({
    pending: false,
    answer: false,
    all: true,
  });

  const [openWhatsAppDiv, setOPenWhatsAppDiv] = useState(false);
  const [showNovaClientButtonClick, setshowNovaClientButtonClick] =
    useState(false);

  const handleOpenWhatAppDiv = () => {
    setOPenWhatsAppDiv(!openWhatsAppDiv);
  };

  const handleOpenNovaClientButtonClick = () => {
    setshowNovaClientButtonClick(true);
  };

  const onClickActive = (status) => {
    // console.log("status .....", status);
    if (status == "pending") {
      setActive({
        pending: true,
        answer: false,
        all: false,
      });
    } else if (status == "answer") {
      setActive({
        pending: false,
        answer: true,
        all: false,
      });
    } else {
      setActive({
        pending: false,
        answer: false,
        all: true,
      });
    }
  };

  return (
    <>
      <AfterAuth>
        <div className="d-flex align-items-center justify-content-between mt-3 mx-md-5 ms-3">
          <h2 className="">Clientes</h2>
          <button
            onClick={() => handleOpenNovaClientButtonClick()}
            className="py-2 px-3"
            style={{
              background: "#0068FF",
              border: "0",
              borderRadius: "6px",
              color: "white",
              fontWeight: 700,
            }}
          >
            + Novo cliente
          </button>
        </div>
        <Card className="mx-3 mx-md-5 my-3 p-3 px-4">
          <TableNavbar title={"Clientes"}>
            <Button
              className={`fs-color border-0 ${
                active.pending ? "activeBtnTable" : "inActiveBtnTable"
              }`}
              //   onClick={onClickActive("pending")}
              onClick={(e) => onClickActive("pending")}
            >
              Pendentes
            </Button>
            <Button
              className={`fs-color border-0 ${
                active.answer ? "activeBtnTable" : "inActiveBtnTable"
              }`}
              onClick={(e) => onClickActive("answer")}
            >
              Respondidas
            </Button>
            <Button
              className={`fs-color border-0 ${
                active.all ? "activeBtnTable" : "inActiveBtnTable"
              }`}
              onClick={(e) => onClickActive("all")}
            >
              Todas
            </Button>
          </TableNavbar>
          <Table responsive>
            <thead>
              <tr
                style={{
                  color: "#B5B6B7",
                  fontSize: "12px",
                }}
              >
                <th width={"25%"}>Nome</th>
                <th>CPF</th>
                <th>CNPJ</th>
                <th>Email/Telefone</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr
                style={{ cursor: "pointer" }}
                onClick={() => handleOpenWhatAppDiv()}
              >
                <td className="fw-bold">Ana Júlia Garcia</td>
                <td>000.000.000-00</td>
                <td>000.000.000-00</td>
                <td>(00)0000-0000</td>
                <td>13 dez 2022</td>
                <td>13:04</td>
                <td>
                  <Button
                    className="text-white fw-bold p-0 border-0"
                    style={{
                      width: "100px",
                      fontSize: "12px",
                      backgroundColor: "green",
                    }}
                  >
                    Aprovado
                  </Button>
                </td>
              </tr>
            </tbody>

            {openWhatsAppDiv && (
              <div className="d-flex mt-2">
                <h6
                  style={{
                    fontSize: "12px",
                    color: "#b5b6b7",
                    fontWeight: 600,
                  }}
                >
                  Entrar em contato por:
                </h6>
                <div
                  className="d-flex align-items-center justify-content-center ms-2"
                  style={{
                    width: "39px",
                    height: "39px",
                    backgroundColor: "#58A43D",
                    borderRadius: "6px",
                  }}
                >
                  <img src="/assets/img/whatsAppClient.svg"></img>
                </div>
              </div>
            )}
          </Table>
        </Card>
        {showNovaClientButtonClick && (
          <NewClientAdd
            show={setshowNovaClientButtonClick}
            handleClose={() => setshowNovaClientButtonClick(false)}
          ></NewClientAdd>
        )}
      </AfterAuth>
    </>
  );
};

export default Clients;
