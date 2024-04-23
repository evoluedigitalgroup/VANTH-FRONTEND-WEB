import React, { useState, useEffect } from "react";
import { Row, Col, Form, FormGroup } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useRecoilValue } from "recoil";
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

  const refreshDocumentTypes = () => {
    getAllDocumentListData();
  };

  const getAllStatusText = (allStatus) => {
    return {
      pending: "Pendente",
      'wait-review': "A. Revisão",
      'wait-documents': "A. Documentos",
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
              <>
                <tr
                  key={`document-${obj.id}`}
                  onClick={() => handleShowRow(obj.id)}
                  style={{
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  <td className="fw-bold">
                    {obj.name}
                  </td>
                  <td>{formatarCPF(obj.CPF)}</td>
                  <td
                    className="d-none d-md-table-cell"
                  >
                    {formatarCNPJ(obj.CNPJ)}
                  </td>
                  <td
                    className="d-none d-md-table-cell"
                  >
                    {formatarTelefone(obj.phone)}
                  </td>
                  <td>{obj.date}</td>
                  <td
                    className="d-none d-md-table-cell"
                  >
                    {obj.time}
                  </td>
                  <td
                    className="position-relative text-start"
                  >
                    <Button
                      style={{
                        width: "125px",
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
                </tr>
                <tr
                  key={`document-${obj.id}-info`}
                  style={{
                    display: idArray.includes(obj.id) ? "table-row" : "none",
                  }}
                >
                  <td colSpan={7} className="my-3 mx-3" style={{
                    width: "100%",
                  }}>
                    <Row className="mt-5 mt-md-0">
                      <Col md={4} xs={12}>
                        <Form>
                          <Form.Label className="Doc-Font-Color">
                            Nome
                          </Form.Label>
                          <FormGroup>
                            <Form.Control
                              placeholder="Nome"
                              type="text"
                              readOnly
                              value={obj.name || ""}
                              name="name"
                            />
                          </FormGroup>
                        </Form>
                      </Col>
                      <Col md={4} xs={12}>
                        <Form>
                          <Form.Label className="Doc-Font-Color">
                            CPF
                          </Form.Label>
                          <FormGroup>
                            <Form.Control
                              placeholder="CPF"
                              type="text"
                              readOnly
                              value={formatarCPF(obj.CPF) || ""}
                              name="CPF"
                            />
                          </FormGroup>
                        </Form>
                      </Col>
                      <Col md={4} xs={12}>
                        <Form>
                          <Form.Label className="Doc-Font-Color">
                            CNPJ
                          </Form.Label>
                          <FormGroup>
                            <Form.Control
                              placeholder="CNPJ"
                              type="text"
                              readOnly
                              value={formatarCNPJ(obj.CNPJ) || ""}
                              name="CNPJ"
                            />
                          </FormGroup>
                        </Form>
                      </Col>
                      <Col md={4} xs={12}>
                        <Form>
                          <Form.Label className="Doc-Font-Color">
                            Email
                          </Form.Label>
                          <FormGroup>
                            <Form.Control
                              placeholder="Email"
                              type="text"
                              readOnly
                              value={obj.email || ""}
                              name="email"
                            />
                          </FormGroup>
                        </Form>
                      </Col>
                      <Col md={4} xs={12}>
                        <Form>
                          <Form.Label className="Doc-Font-Color">
                            Telefone
                          </Form.Label>
                          <FormGroup>
                            <Form.Control
                              placeholder="Telefone"
                              type="text"
                              readOnly
                              value={formatarTelefone(obj.phone) || ""}
                              name="phone"
                            />
                          </FormGroup>
                        </Form>
                      </Col>
                      {obj.otherInformation.map((info, i) => {
                        return (
                          <Col key={info.key} md={4} xs={12}>
                            <Form>
                              <Form.Label className="Doc-Font-Color">
                                {info?.key}
                              </Form.Label>
                              <FormGroup>
                                <Form.Control
                                  placeholder={info?.placeholder}
                                  type="text"
                                  readOnly
                                  value={
                                    info?.value || info?.placeholder || ""
                                  }
                                  name={info?.key}
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
                  </td>
                </tr>
              </>
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
    </div >
  );
};

export default DocumentTable;
