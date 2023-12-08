import React, { useState, useEffect, useMemo } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import Table from "react-bootstrap/Table";
import { useRecoilValue } from "recoil";
import { loginAtom } from "../../recoil/Atoms";
import {
  documentActivePageAtom,
  documentNextPageSelector,
  documentPrevPageSelector,
  documentShowFirstPageSelector,
  documentShowLastPageSelector,
} from "../../recoil/PaginationAtoms/Document";
import Pagination from "../Pagination";
import NewPagination from "../Pagination/NewPagination";
import RecordFound from "../RecordFound";
import TableRowDocument from "./documents/TableRowDocument";
import GenerateLinkNew from "./GenerateLinkNew";
import ImageUploadModal from "./ImageUploadModal";
import GenerateLinkBtn from "./NewClientCards/GenerateLinkBtn";
import NewMemberAdd from "./NewMemberAdd";
import { getAllDocumentsList } from "../../helper/API/contact";

const DocumentTable = ({
  tableRow,
  refresh,
  setRefresh,
  id,
  setId,
  open,
  setOpen,
  handleShowRow,
  idArray,
  tableDataArray,
  totalPage,
}) => {
  const adminName = useRecoilValue(loginAtom);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [tableData, setTableData] = useState(tableRow);
  const [documents, setDocument] = useState();
  const [documentListData, setDocumentListData] = useState([]);

  const getAllDocumentListData = async () => {
    const documentList = await getAllDocumentsList();
    setDocumentListData(documentList.data);
  };

  useEffect(() => {
    console.log("tableData : ", tableData);
    setTableData(tableRow);
    getAllDocumentListData();
  }, [tableRow]);

  const handleShowImageModal = (data, type) => {
    setDocument({
      ...data,
      type,
    });
    setOpenImageModal(true);
  };

  const handleShowLinkModal = (val) => {
    console.log("clicked");
    setOpenLinkModal(true);
    setEditData(val);
  };
  // console.log("idArray.includes(id)", idArray);
  const getRequiredLength = (obj) => {
    return Object.values(obj?.documentRequest?.requiredPermission).filter(
      (val) => val
    ).length;
  };

  const getTrClass = (obj) => {
    return idArray.includes(obj.id) &&
      getRequiredLength(obj) <= 3 &&
      getRequiredLength(obj) !== 0
      ? "row-height1"
      : idArray.includes(obj.id) &&
        getRequiredLength(obj) >= 4 &&
        getRequiredLength(obj) <= 6 &&
        getRequiredLength(obj) !== 0
      ? "row-height2"
      : idArray.includes(obj.id) &&
        getRequiredLength(obj) >= 14 &&
        getRequiredLength(obj) !== 0
      ? "row-height"
      : idArray.includes(obj.id) &&
        getRequiredLength(obj) >= 6 &&
        getRequiredLength(obj) <= 9
      ? "row-height3"
      : idArray.includes(obj.id) &&
        getRequiredLength(obj) >= 9 &&
        getRequiredLength(obj) <= 12
      ? "row-height4"
      : idArray.includes(obj.id) &&
        getRequiredLength(obj) >= 12 &&
        getRequiredLength(obj) <= 14
      ? "row-height6"
      : idArray.includes(obj.id) && getRequiredLength(obj) === 0
      ? "row-height5"
      : "";
  };

  return (
    <div>
      <Table responsive>
        {tableData?.length ? (
          <thead>
            <tr style={{ color: "#B5B6B7", fontSize: "12px" }}>
              <th width={"25%"}>Nome</th>
              <th>CPF</th>
              <th>CNPJ</th>
              <th>Telefone</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Status</th>
            </tr>
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
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                className={getTrClass(obj)}
              >
                <td onClick={() => handleShowRow(obj.id)} className="fw-bold">
                  {obj.name}
                </td>
                <td onClick={() => handleShowRow(obj.id)}>{obj.CPF}</td>
                <td onClick={() => handleShowRow(obj.id)}>{obj.CNPJ}</td>
                <td onClick={() => handleShowRow(obj.id)}>{obj.phone}</td>
                <td onClick={() => handleShowRow(obj.id)}>{obj.date}</td>
                <td onClick={() => handleShowRow(obj.id)}>{obj.time}</td>
                <td
                  className="position-relative text-end"
                  style={{ zIndex: 1000 }}
                >
                  <Button
                    style={{
                      width: "100px",
                      fontSize: "12px",
                      fontWeight: "500",
                      border: "0",
                      padding: "0",
                      borderRadius: "3px",
                    }}
                    className={
                      obj.allStatus === "pending"
                        ? "document-pending"
                        : obj.allStatus === "wait"
                        ? "document-wait"
                        : "document-success"
                    }
                  >
                    {obj.allStatus === "pending"
                      ? "Aguard. doc."
                      : obj.allStatus === "wait"
                      ? "Aguard. rev."
                      : "Concluído"}
                  </Button>
                </td>
                {(obj.allStatus === "pending" ||
                  obj.allStatus === "wait" ||
                  obj.allStatus === "approved") && (
                  <div>
                    {idArray.includes(obj.id) ? (
                      <Row
                        className="position-absolute"
                        style={{
                          left: "0",
                          bottom: "0",
                          width: "100%",
                        }}
                      >
                        <>
                          <TableRowDocument
                            obj={obj}
                            permission={
                              obj?.documentRequest?.requiredPermission
                            }
                            documentListData={documentListData}
                            handleShowImageModal={handleShowImageModal}
                          />
                          <GenerateLinkBtn
                            onClick={() => handleShowLinkModal(obj)}
                            obj={obj}
                            md={12}
                          />
                        </>
                        {obj.allStatus === "approved" && (
                          <Row>
                            <Col
                              className="d-flex justify-content-center mt-2 ms-4"
                              style={{
                                color: "#C4CCD2",
                                fontSize: "12px",
                              }}
                            >
                              Responsável por esse cliente:
                              {adminName.name}
                            </Col>
                          </Row>
                        )}
                      </Row>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        ) : (
          <RecordFound label="Nenhum Registro Encontrado" />
        )}
        {openImageModal && (
          <ImageUploadModal
            open={openImageModal}
            handleClose={() => setOpenImageModal(false)}
            documents={documents}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )}
        {openLinkModal && documentListData.length && (
          <GenerateLinkNew
            open={openLinkModal}
            handleClose={() => setOpenLinkModal(false)}
            editData={editData}
            refresh={refresh}
            setRefresh={setRefresh}
            switchesData={documentListData}
            editSwitchesData={editData?.documentRequest?.requiredPermission}
          />
        )}
      </Table>
      <NewPagination
        show={
          tableDataArray?.findContactData?.length &&
          tableDataArray?.totalContactDetails
        }
        atom={documentActivePageAtom}
        prevSelector={documentPrevPageSelector}
        nextSelector={documentNextPageSelector}
        showFirstSelector={documentShowFirstPageSelector}
        showLastSelector={documentShowLastPageSelector}
        totalPage={totalPage}
      />
    </div>
  );
};

export default DocumentTable;
