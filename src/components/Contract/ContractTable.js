import React, { useState, useRef, useEffect, useMemo, Suspense } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import Table from "react-bootstrap/Table";
import {
  contactActivePageAtom,
  contactNextPageSelector,
  contactPrevPageSelector,
  contactShowFirstPageSelector,
  contactShowLastPageSelector,
} from "../../recoil/PaginationAtoms/Contact";
import GenerateLinkNew from "../Document/GenerateLinkNew";
import NewPagination from "../Pagination/NewPagination";
import RecordFound from "../RecordFound";

const ContractTable = ({
  tableRow,
  refresh,
  setRefresh,
  tableDataArray,
  totalPage,
}) => {
  const [openLinkModal, setOpenLinkModal] = useState(false);

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

  return (
    <div>
      {/* <Suspense fallback={<Loader />}> */}
      <Table responsive>
        {tableData?.length ? (
          <thead>
            <tr style={{ color: "#B5B6B7", fontSize: "12px" }}>
              <th width={"25%"}>Nome</th>
              <th>Status do cliente</th>
              <th className="d-none d-md-table-cell">Status do contrato</th>            </tr>
          </thead>
        ) : (
          ""
        )}
        {tableData?.length ? (
          <tbody>
            {tableData?.map((obj, i) => (
              <tr
                style={{
                  position: "relative",
                  fontSize: "14px",
                }}
                height={idArray.includes(obj.id) ? "100px" : ""}
              >
                <td
                  className="fw-bold"
                >
                  {obj?.recipient?.name}
                </td>
                <td
                  className="fw-bold"
                >
                  {obj?.recipient?.name}
                </td>
                <td
                  className="fw-bold"
                >
                  {obj?.recipient?.name}
                </td>
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

      {openLinkModal && (
        <GenerateLinkNew
          open={openLinkModal}
          handleClose={() => setOpenLinkModal(false)}
          editData={editData}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      {/* </Suspense> */}
    </div>
  );
};

export default ContractTable;
