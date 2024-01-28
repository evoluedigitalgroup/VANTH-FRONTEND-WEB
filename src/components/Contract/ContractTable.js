import React, { useState, useRef, useEffect, useMemo } from "react";

import Table from "react-bootstrap/Table";
import {
  contractActivePageAtom,
  contractNextPageSelector,
  contractPrevPageSelector,
  contractShowFirstPageSelector,
  contractShowLastPageSelector,
} from "../../recoil/PaginationAtoms/Contract";
import GenerateLinkNew from "../Document/GenerateLinkNew";
import NewPagination from "../Pagination/NewPagination";
import RecordFound from "../RecordFound";
import { Button } from "react-bootstrap";

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

  const [currentPage, setCurrentPage] = useState(1);

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
                  <Button
                    style={{
                      width: "100px",
                      fontSize: "12px",
                      borderRadius: "3px",
                      border: "0px",
                      fontWeight: "normal",
                      padding: "0",
                    }}
                    className={
                      obj?.recipient?.contactApprove === "pending"
                        ? "document-pending"
                        : obj?.recipient?.contactApprove === "rejected"
                          ? "contact-wait"
                          : "document-success"
                    }
                  >
                    {obj?.recipient?.contactApprove === "pending"
                      ? "Aguardando"
                      : obj?.recipient?.contactApprove === "rejected"
                        ? "Reprovado"
                        : "Aprovado"}
                  </Button>
                </td>
                <td
                  className="fw-bold"
                >
                  <Button
                    style={{
                      width: "100px",
                      fontSize: "12px",
                      borderRadius: "3px",
                      border: "0px",
                      fontWeight: "normal",
                      padding: "0",
                    }}
                    className={
                      obj?.status === "pending"
                        ? "document-pending"
                        : obj?.status === "rejected"
                          ? "contact-wait"
                          : "document-success"
                    }
                  >
                    {obj?.status === "pending"
                      ? "Aguardando"
                      : obj?.status === "rejected"
                        ? "Recusado"
                        : "Assinada"}
                  </Button>

                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colspan={3}>
                <RecordFound label="Nenhum Registro Encontrado" />
              </td>
            </tr>
          </tbody>
        )}
      </Table>
      <NewPagination
        show={
          tableDataArray?.findData?.length &&
          tableDataArray?.totalFindData
        }
        atom={contractActivePageAtom}
        prevSelector={contractPrevPageSelector}
        nextSelector={contractNextPageSelector}
        showFirstSelector={contractShowFirstPageSelector}
        showLastSelector={contractShowLastPageSelector}
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
