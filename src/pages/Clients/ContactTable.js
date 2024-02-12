import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";

import Table from "react-bootstrap/Table";
import {
  contactActivePageAtom,
  contactNextPageSelector,
  contactPrevPageSelector,
  contactShowFirstPageSelector,
  contactShowLastPageSelector,
} from "../../recoil/PaginationAtoms/Contact";
import NewPagination from "../../components/Pagination/NewPagination";
import RecordFound from "../../components/RecordFound";
import ContactTooltip from "./ContactTooltip";

const ContactTable = ({
  tableRow,
  refresh,
  setRefresh,
  tableDataArray,
  totalPage,
}) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [tableData, setTableData] = useState(tableRow);
  const [idArray, setIdArray] = useState([]);
  let PageSize = 10;

  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [visitorId, setVisitorId] = useState(null);

  useEffect(() => {
    setTableData(tableRow);
  }, [tableRow]);

  const handleShowRow = (id) => {
    setId(id);
    setOpen(!open);
    if (idArray.includes(id)) {
      var index = idArray.indexOf(id);
      if (index !== -1) {
        idArray.splice(index, 1);
      }
    } else {
      setIdArray((old) => [...old, id]);
    }
  };

  const handalShowTooltip = (event, id) => {
    setVisitorId(id);
    setShow(true);
    setTarget(event.target);
  };

  return (
    <div>
      {/* <Suspense fallback={<Loader />}> */}
      <Table responsive>
        {tableData?.length ? (
          <thead>
            <tr style={{ color: "#B5B6B7", fontSize: "12px" }}>
              <th width={"25%"}>Nome</th>
              <th>CPF</th>
              <th className="d-none d-md-table-cell">CNPJ</th>
              <th className="d-none d-md-table-cell">Telefone</th>
              <th>Data</th>
              <th className="d-none d-md-table-cell">Hora</th>
              <th width={"10%"}>Status</th>
            </tr>
          </thead>
        ) : (
          ""
        )}
        {tableData?.length ? (
          <tbody>
            {tableData?.map((obj, i) => (
              <tr
                id="clientTable"
                style={{
                  position: "relative",
                  fontSize: "14px",
                }}
                height={idArray.includes(obj.id) ? "100px" : ""}
              >
                <td
                  className="fw-bold"
                  onClick={
                    obj.contactApprove === "pending"
                      ? () => handleShowRow(obj.id)
                      : null
                  }
                >
                  {obj.name}
                </td>
                <td
                  onClick={
                    obj.contactApprove === "pending"
                      ? () => handleShowRow(obj.id)
                      : null
                  }
                >
                  {obj.CPF}
                </td>
                <td
                  className="d-none d-md-table-cell"
                  onClick={
                    obj.contactApprove === "pending"
                      ? () => handleShowRow(obj.id)
                      : null
                  }
                >
                  {obj.CNPJ}
                </td>
                <td
                  className="d-none d-md-table-cell"
                  onClick={
                    obj.contactApprove === "pending"
                      ? () => handleShowRow(obj.id)
                      : null
                  }
                >
                  {obj.phone}
                </td>
                <td
                  onClick={
                    obj.contactApprove === "pending"
                      ? () => handleShowRow(obj.id)
                      : null
                  }
                >
                  {obj.date}
                </td>
                <td
                  className="d-none d-md-table-cell"
                  onClick={
                    obj.contactApprove === "pending"
                      ? () => handleShowRow(obj.id)
                      : null
                  }
                >
                  {obj.time}
                </td>
                <td className="position-relative">
                  <Button
                    id="clientTableButton"
                    style={{
                      width: "100px",
                      fontSize: "12px",
                      borderRadius: "3px",
                      border: "0px",
                      fontWeight: "normal",
                      padding: "0",
                    }}
                    className={
                      obj.contactApprove === "pending"
                        ? "document-pending"
                        : obj.contactApprove === "rejected"
                        ? "contact-wait"
                        : "document-success"
                    }
                    onClick={
                      obj.contactApprove !== "rejected" &&
                      obj.contactApprove !== "approved"
                        ? (e) => handalShowTooltip(e, obj.id)
                        : null
                    }
                  >
                    {obj.contactApprove === "pending"
                      ? "Aguardando"
                      : obj.contactApprove === "rejected"
                      ? "Reprovado"
                      : "Aprovado"}
                  </Button>
                  {show && (
                    <ContactTooltip
                      show={show}
                      target={target}
                      ref={ref}
                      refresh={refresh}
                      setRefresh={setRefresh}
                      visitorId={visitorId}
                      close={() => setShow(false)}
                    />
                  )}
                </td>
                {
                  obj.contactApprove === "pending" &&
                    (idArray.includes(obj.id) ? (
                      <div
                        className="d-flex justify-content-end"
                        style={{
                          position: "absolute",
                          top: "45%",
                          right: "0%",
                          paddingRight: "1%",
                          marginRight: "2px",
                        }}
                      >
                        <h6
                          style={{ color: "#B5B6B7" }}
                          className="d-flex mt-1 align-items-center"
                        >
                          Entrar em contato por:
                        </h6>
                        <div className="ps-3">
                          {obj?.phone && (
                            <Button
                              style={{
                                background: "#1C3D59",
                              }}
                              className="border-0"
                            >
                              <a
                                href={`https://wa.me/${obj.phone}`}
                                target="_blank"
                                style={{
                                  textDecoration: "none",
                                  color: "#fff",
                                }}
                              >
                                <i className="bi bi-whatsapp"></i>
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      ""
                    ))
                  // </div>
                }
              </tr>
            ))}
          </tbody>
        ) : (
          <RecordFound label="Nenhum Registro Encontrado" />
        )}
      </Table>
      <NewPagination
        show={tableDataArray?.findData?.length && tableDataArray?.totalFindData}
        atom={contactActivePageAtom}
        prevSelector={contactPrevPageSelector}
        nextSelector={contactNextPageSelector}
        showFirstSelector={contactShowFirstPageSelector}
        showLastSelector={contactShowLastPageSelector}
        totalPage={totalPage}
      />
      {/* </Suspense> */}
    </div>
  );
};

export default ContactTable;
