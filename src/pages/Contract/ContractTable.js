import React, { useState, useRef, useEffect, useMemo } from "react";
import Table from "react-bootstrap/Table";
import { Button, Row } from "react-bootstrap";
//  
import {
  contractActivePageAtom,
  contractNextPageSelector,
  contractPrevPageSelector,
  contractShowFirstPageSelector,
  contractShowLastPageSelector,
} from "../../recoil/PaginationAtoms/Contract";
import NewPagination from "../../components/Pagination/NewPagination";
import RecordFound from "../../components/RecordFound";
import GenerateLinkBtn from "./GenerateLinkBtn";
import ReviewContractBtn from "./ReviewContractBtn";
import ViewContractBtn from "./ViewContractBtn";
import { CONTRACT_LINK_URL } from "../../config";
import { useRecoilState, useRecoilValue } from "recoil";
import { contractModels, contractSelectedUser, profileAtom } from "../../recoil/Atoms";
import { selectedTemplatesAtom } from "../../recoil/ContractAtoms/Templates";
import { openPreviewContract, openReviewTemplateSelect, resetModels } from "../../recoil/helpers/contractModels";

const ContractTable = ({
  idArray,
  tableRow,
  refresh,
  setRefresh,
  tableDataArray,
  totalPage,
  handleShowRow,
  setContractLink,
  setReviewTemplates
}) => {
  const profile = useRecoilValue(profileAtom);

  const [models, setModels] = useRecoilState(contractModels);
  const [selectedOption, setSelectedOption] =
    useRecoilState(contractSelectedUser);

  const [selectedTemplates, setSelectedTemplates] = useRecoilState(selectedTemplatesAtom);

  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [tableData, setTableData] = useState(tableRow);
  let PageSize = 10;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTableData(tableRow);
  }, [tableRow]);

  const ClientName = ({ data: obj }) => {
    return (
      <td
        className="fw-bold"
        onClick={() => handleShowRow(obj.id)}
      >
        {obj?.recipient?.name}
      </td>
    )
  }

  const ClientStatus = ({ data: obj }) => {
    return (
      <td
        className="fw-bold"
        onClick={() => handleShowRow(obj.id)}
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
    )
  }

  const ContractStatus = ({ data: obj }) => {

    const classValue = () => {
      if (obj?.status === "pending") {
        return "document-pending";
      } else if (obj?.status === "rejected") {
        return "contact-wait";
      } else if (obj?.status === 'signed') {
        if (!obj?.isApproved || obj?.isApproved === "pending") {
          return "document-wait";
        } else if (obj?.isApproved === "rejected") {
          return "contact-wait";
        } else if (obj?.isApproved === "approved") {
          return "document-success";
        }
      } else {
        return "document-success";
      }
    }

    const labelValue = () => {
      if (obj?.status === "pending") {
        return "aguardando assinatura";
      } else if (obj?.status === "rejected") {
        return "Assinatura recusada";
      } else if (obj?.status === 'signed') {
        if (!obj?.isApproved || obj?.isApproved === "pending") {
          return "Aguardando revisão";
        } else if (obj?.isApproved === "rejected") {
          return "Reprovado";
        } else if (obj?.isApproved === "approved") {
          return "Aprovado";
        }
      } else {
        return "Assinada";
      }
    }

    return (
      <td
        className="fw-bold"
      >
        <Button
          style={{
            width: "150px",
            fontSize: "12px",
            borderRadius: "3px",
            border: "0px",
            fontWeight: "normal",
            padding: "0",
          }}
          onClick={() => handleShowRow(obj.id)}
          className={classValue()}
        >
          {labelValue()}
        </Button>

      </td>
    )
  }

  const getHeightValue = (obj) => {
    return idArray.includes(obj.id)
      ? (100) + 'px'
      : 'unset';
  }

  const onGenerateLink = (obj) => {
    setSelectedTemplates(obj.contractTemplates);
    const linkValue = `${CONTRACT_LINK_URL}${profile.company}/${obj.uuid}/${obj.docusignEnvelopeId}`;

    setSelectedOption({
      value: obj.recipient.id,
      label: obj.recipient.name,
      phoneNumber: obj.recipient.phone,
    })
    setContractLink(linkValue);

    setModels(resetModels());
    setModels(openPreviewContract());
  }

  const onReviewLink = (obj) => {
    const templatesValue = obj.contractDocumentIds.map((val) => val.template);
    const setValue = {
      data: obj,
      templatesList: templatesValue
    }
    console.log("setValue", setValue);
    setReviewTemplates(setValue);

    setModels(resetModels());
    setModels(openReviewTemplateSelect());
  }

  const ActionBtn = ({ data: obj }) => {

    if (obj?.status === "pending") {
      return <GenerateLinkBtn
        onClick={() => {
          onGenerateLink(obj);
        }}
        obj={obj}
        md={12}
      />
    } else if (obj?.status === "rejected") {
      return <GenerateLinkBtn
        onClick={() => {
          onGenerateLink(obj);
        }}
        obj={obj}
        md={12}
      />
    } else if (obj?.status === 'signed') {
      if (!obj?.isApproved || obj?.isApproved === "pending") {
        return (
          <ReviewContractBtn
            onClick={() => {
              onReviewLink(obj)
            }}
            obj={obj}
            md={12}
          />
        )
      } else if (obj?.isApproved === "rejected") {
        return <GenerateLinkBtn
          onClick={() => {
            onGenerateLink(obj);
          }}
          obj={obj}
          md={12}
        />
      } else if (obj?.isApproved === "approved") {
        return (
          <ViewContractBtn
            onClick={() => { }}
            obj={obj}
            md={12}
          />
        )
      }
    } else {
      return (
        <ViewContractBtn
          onClick={() => { }}
          obj={obj}
          md={12}
        />
      )
    }
  };

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
              <>
                <tr
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    fontSize: "14px",
                    height: getHeightValue(obj),
                  }}

                >
                  <ClientName data={obj} />
                  <ClientStatus data={obj} />
                  <ContractStatus data={obj} />
                  {idArray.includes(obj.id) ? (
                    <Row
                      className="position-absolute mt-5 my-2"
                      style={{
                        left: "0",
                        bottom: "0",
                        width: "100%",
                        top: "0"
                      }}
                    >
                      <ActionBtn data={obj} />
                    </Row>
                  ) : null}
                </tr>
              </>
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
      {/* </Suspense> */}
    </div>
  );
};

export default ContractTable;
