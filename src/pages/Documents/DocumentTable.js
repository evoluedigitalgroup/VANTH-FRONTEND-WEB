import React, { useState, useEffect, useMemo } from "react";
import { Card, Row, Col, Form, FormGroup, InputGroup } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useRecoilValue } from "recoil";
//
import { getAllDocumentsList } from "./api";
import { loginAtom } from "../../recoil/Atoms";
import {
  documentActivePageAtom,
  documentNextPageSelector,
  documentPrevPageSelector,
  documentShowFirstPageSelector,
  documentShowLastPageSelector,
} from "../../recoil/PaginationAtoms/Document";
import GenerateLinkBtn from "./GenerateLinkBtn";
import GenerateLinkModel from "./GenerateLinkModel";
import RecordFound from "../../components/RecordFound";
import { usageAtom } from "../../recoil/UsageAtoms/Usage";

import NewPagination from "../../components/Pagination/NewPagination";
import ImageUploadModal from "../../components/Document/ImageUploadModal";
import TableRowDocument from "../../components/Document/table/TableRowDocument";
import { formatarCNPJ, formatarCPF, formatarTelefone } from "../../library/contentformater/ContentFormater";
import { get } from "react-hook-form";

const DocumentTable = ({
  tableRow,
  refresh,
  setRefresh,
  handleShowRow,
  idArray,
  tableDataArray,
  totalPage,
}) => {
  const navigate = useNavigate();

  const usage = useRecoilValue(usageAtom);
  const adminName = useRecoilValue(loginAtom);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [tableData, setTableData] = useState(tableRow);
  const [documents, setDocument] = useState();
  const [documentListData, setDocumentListData] = useState([]);

  const getAllDocumentListData = async () => {
    const documentList = await getAllDocumentsList();
    console.log("documentList", documentList);
    setDocumentListData(documentList.data);
  };

  useEffect(() => {
    setTableData(tableRow);
    getAllDocumentListData();
  }, [tableRow, isMobile]);


  const handleShowImageModal = (data, type) => {
    setDocument({
      ...data,
      type,
    });
    setOpenImageModal(true);
  };

  const handleShowLinkModal = (val) => {
    if (usage?.storage?.percent === 100) {
      navigate("/profile/my-plan");
    } else {
      setOpenLinkModal(true);
      setEditData(val);
    }
  };

  const getRequiredLength = (obj) => {
    return Object.values(obj?.documentRequest?.requiredPermission).filter(
      (val) => val
    ).length;
  };

  const getOtherInformationLength = (obj) => {
    return obj?.otherInformation.length;
  };

  const refreshDocumentTypes = () => {
    getAllDocumentListData();
  };

  const getHeightValue = (obj) => {
    const totalLength = getRequiredLength(obj) + getOtherInformationLength(obj);
    const baseHeight = isMobile ? 1 : 3;
    const minHeight = idArray.includes(obj.id) ? totalLength / baseHeight * 100 + 200 + "px" : "unset";
    return minHeight;
  };

  const getAllStatusText = (allStatus) => {
    return {
      pending: "Pendente",
      'wait-review': "Aguardando Revisão",
      'wait-documents': "Aguardando Documentos",
      approved: "Aprovado",
    }[allStatus] || "Não definido";
  };

  const getAllStatusClassname = (allStatus) => {
    return {
      pending: "document-pending",
      'wait-review': "document-wait",
      'wait-documents': "document-wait",
      approved: "document-approved",
    }[allStatus] || "";
  };

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
              <th>Status</th>
            </tr>
          </thead>
        )}
        {tableData?.length ? (
          <tbody>
            {tableData?.map((obj, i) => (
              <tr
                key={`document-${i}`}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  fontSize: "14px",
                  height: getHeightValue(obj),
                }}
              >
                <td onClick={() => handleShowRow(obj.id)} className="fw-bold">
                  {obj.name}
                </td>
                <td onClick={() => handleShowRow(obj.id)}>{formatarCPF(obj.CPF)}</td>
                <td
                  className="d-none d-md-table-cell"
                  onClick={() => handleShowRow(obj.id)}
                >
                  {formatarCNPJ(obj.CNPJ)}
                </td>
                <td
                  className="d-none d-md-table-cell"
                  onClick={() => handleShowRow(obj.id)}
                >
                  {formatarTelefone(obj.phone)}
                </td>
                <td onClick={() => handleShowRow(obj.id)}>{obj.date}</td>
                <td
                  className="d-none d-md-table-cell"
                  onClick={() => handleShowRow(obj.id)}
                >
                  {obj.time}
                </td>
                <td
                  className="position-relative text-start"
                  // style={{ zIndex: 1000 }}
                  onClick={() => handleShowRow(obj.id)}
                >
                  <Button
                    style={{
                      width: "175px",
                      fontSize: "12px",
                      fontWeight: "500",
                      border: "0",
                      paddingInline: "10px",
                      paddingBlock: "2px",
                      borderRadius: "3px",
                    }}
                    className={getAllStatusClassname(obj.allStatus)}
                  >
                    {getAllStatusText(obj.allStatus)}
                  </Button>
                </td>
                <div>
                  {idArray.includes(obj.id) && (
                    <div
                      className="position-absolute my-3 mx-3"
                      style={{
                        left: "0",
                        right: "0",
                        top: "auto",
                        transform: "translateY(10%)",
                        overflowY: "auto",
                      }}
                    >

                      <>
                        <Row className="mt-5 mt-md-0">
                          {obj.otherInformation.map((objct, i) => {
                            return (
                              <Col key={`${i}`} md={4} xs={12}>
                                <Form>
                                  <Form.Label className="Doc-Font-Color">
                                    {objct?.key}
                                  </Form.Label>
                                  <FormGroup style={{ position: "relative" }}>
                                    <Form.Control
                                      placeholder="Sua informação"
                                      type="text"
                                      readOnly
                                      value={
                                        objct?.value
                                          ? objct?.value
                                          : objct?.placeholder
                                      }
                                      name="name"
                                    />
                                  </FormGroup>
                                </Form>
                              </Col>
                            );
                          })}
                        </Row>

                        <Row>
                          <TableRowDocument
                            obj={obj}
                            permission={obj?.documentRequest?.requiredPermission}
                            documentListData={documentListData}
                            handleShowImageModal={handleShowImageModal}
                          />
                          <div className={`${isMobile ? 'mt-0' : 'mt-4'}`}>
                            <GenerateLinkBtn
                              onClick={() => handleShowLinkModal(obj)}
                              obj={obj}
                              md={12}
                            />
                          </div>
                        </Row>
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
                      </>
                    </div>
                  )}
                </div>
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
          <GenerateLinkModel
            open={openLinkModal}
            handleClose={() => setOpenLinkModal(false)}
            editData={editData}
            refresh={refresh}
            setRefresh={setRefresh}
            switchesData={documentListData}
            refreshDocumentTypes={refreshDocumentTypes}
            editSwitchesData={editData?.documentRequest?.requiredPermission}
          />
        )}
      </Table>
      <NewPagination
        show={
          tableDataArray?.contacts?.length &&
          tableDataArray?.count
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
