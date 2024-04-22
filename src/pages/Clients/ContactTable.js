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
import { formatarCNPJ, formatarCPF, formatarTelefone } from "../../library/contentformater/ContentFormater";
import ViewClient from "./ViewClient";

const ContactTable = ({
  tableRow,
  refresh,
  setRefresh,
  tableDataArray,
  totalPage,
}) => {
  const ref = useRef(null);
  const [tableData, setTableData] = useState(tableRow);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [visitorId, setVisitorId] = useState(null);

  useEffect(() => {
    setTableData(tableRow);
  }, [tableRow]);

  const handalShowTooltip = (event, id) => {
    setVisitorId(id);
    setShow(true);
    setTarget(event.target);
  };

  const getContactApproveText = (contactApprove) => {
    return {
      pending: "Aguardando",
      approved: "Aprovado",
      rejected: "Reprovado",
    }[contactApprove];
  };

  const getContactApproveClassname = (contactApprove) => {
    return {
      pending: "contact-pending",
      approved: "contact-approved",
      rejected: "contact-rejected",
    }[contactApprove];
  }

  const [openedId, setOpenedId] = useState(null);

  const selectedClient = tableData?.find((obj) => obj.id === openedId);

  return (
    <div>
      <Table responsive>
        {tableData?.length && (
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
        )}
        {tableData?.length ? (
          <tbody>
            {tableData?.map((obj, i) => (
              <tr
                onClick={() => setOpenedId(obj.id)}
                key={`contact-${obj.id}`}
                id="clientTable"
                style={{
                  fontSize: "14px",
                }}
              >
                <td className="fw-bold">
                  {obj.name}
                </td>
                <td>
                  {formatarCPF(obj.CPF)}
                </td>
                <td className="d-none d-md-table-cell">
                  {formatarCNPJ(obj.CNPJ)}
                </td>
                <td className="d-none d-md-table-cell">
                  {formatarTelefone(obj.phone)}
                </td>
                <td>
                  {obj.date}
                </td>
                <td className="d-none d-md-table-cell">
                  {obj.time}
                </td>
                <td>
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
                    className={getContactApproveClassname(obj.contactApprove)}
                    onClick={
                      obj.contactApprove !== "rejected" &&
                        obj.contactApprove !== "approved"
                        ? (e) => handalShowTooltip(e, obj.id)
                        : (e) => handalShowTooltip(e, obj.id)
                    }
                  >
                    {getContactApproveText(obj.contactApprove)}
                  </Button>
                  {show && (
                    <ContactTooltip
                      contactApprove={obj.contactApprove}
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
              </tr >
            ))}
          </tbody >
        ) : (
          <RecordFound label="Nenhum Registro Encontrado" />
        )}
      </Table >
      <NewPagination
        show={tableDataArray?.clients?.length && tableDataArray?.count}
        atom={contactActivePageAtom}
        prevSelector={contactPrevPageSelector}
        nextSelector={contactNextPageSelector}
        showFirstSelector={contactShowFirstPageSelector}
        showLastSelector={contactShowLastPageSelector}
        totalPage={totalPage}
      />
      {openedId && (
        <ViewClient
          show={Boolean(openedId)}
          onHide={() => {
            setOpenedId(null)
            console.log("setOpenedId(null)")
          }}
          client={selectedClient}
        />
      )}
    </div >
  );
};

export default ContactTable;
