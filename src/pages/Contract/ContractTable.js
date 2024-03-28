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
import {
  contractModels,
  contractSelectedUser,
  profileAtom,
} from "../../recoil/Atoms";
import { selectedTemplatesAtom } from "../../recoil/ContractAtoms/Templates";
import {
  openPreviewContract,
  openReviewTemplateSelect,
  resetModels,
} from "../../recoil/helpers/contractModels";
import { isDesktop } from "react-device-detect";

const ContractTable = ({
  idArray,
  tableRow,
  refresh,
  setRefresh,
  tableDataArray,
  totalPage,
  handleShowRow,
  setContractLink,
  setReviewTemplates,
}) => {
  const profile = useRecoilValue(profileAtom);

  const [models, setModels] = useRecoilState(contractModels);
  const [selectedOption, setSelectedOption] =
    useRecoilState(contractSelectedUser);

  const [selectedTemplates, setSelectedTemplates] = useRecoilState(
    selectedTemplatesAtom
  );

  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [tableData, setTableData] = useState(tableRow);
  let PageSize = 10;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log(tableRow)
    setTableData(tableRow);
  }, [tableRow]);

  //Above Subs
  //obj?.recipient.map((item, index) => { return item.name })

  const ClientName = ({ data: obj }) => {
    return (
      <div className="d-flex flex-column mb-3">
        <td className="fw-bold" onClick={() => handleShowRow(obj.id)}>
          {obj?.recipient[0].name}
        </td>
      </div>
    );
  };

  const ClientStatus = ({ data: obj }) => {
    return (
      <td className="fw-bold" onClick={() => handleShowRow(obj.id)}>
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
    );
  };

  const ContractStatus = ({ data: obj }) => {
    const isApproved =
      obj?.contractDocumentIds.filter((val) => val.isApproved === "approved")
        .length === obj?.contractDocumentIds.length;
        
    const idRejected = !!obj?.contractDocumentIds.filter(
      (val) => val.isApproved === "rejected"
    ).length;

    const classValue = () => {  
      if (obj?.status === "pending") {
        return "document-pending";
      } else if (obj?.status === "pending_others") {
        return "document-pending";
      } else if (obj?.status === "rejected") {
        return "contact-wait";
      } else if (obj?.status === "signed") {
        if (!isApproved && !idRejected) {
          return "document-wait";
        } else if (!isApproved) {
          return "contact-wait";
        } else if (isApproved) {
          return "document-success";
        }
      } else {
        return "document-success";
      }
    };

    const labelValue = () => {
      if (obj?.status === "pending") {
        return "Aguardando Assinaturas";
      } else if (obj?.status === "rejected") {
        return "Assinatura recusada";
      } else if (obj?.status === "signed") {
        if (!isApproved && !idRejected) {
          return "Aguardando revisão";
        } else if (idRejected && !isApproved) {
          return "Reprovado";
        } else if (isApproved) {
          return "Aprovado";
        }
      } else if (obj?.status === "pending_others") {
        return "Aguardando Assinaturas"
      } else {
        return "Assinada";
      }
    };

    return (
      <td className="d-none d-md-table-cell fw-bold">
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
    );
  };

  const getHeightValue = (obj) => {
    return idArray.includes(obj.id) ? 300 + "px" : "unset";
  };

  const onGenerateLink = (obj) => {
    setSelectedTemplates(obj.contractTemplates);

    setSelectedOption({
      value: obj.recipient.id,
      label: obj.recipient.name,
      phoneNumber: obj.recipient.phone,
    });

    let linkList = []

    obj?.recipient.forEach((item, i) => {
      linkList.push({
        name: item.name,
        link: `${CONTRACT_LINK_URL}${profile.company}/${obj.uuid}/${obj.docusignEnvelopeId}/${item.id}`,
      })
    })

    setContractLink(linkList)

    setModels(resetModels());
    setModels(openPreviewContract());
  };

  const onReviewLink = (obj) => {
    const templatesValue = obj?.contractDocumentIds.map((val) => val.template);
    console.log(templatesValue)
    const setValue = {
      data: obj,
      templatesList: templatesValue,
    };
    console.log("setValue", setValue, obj);
    setReviewTemplates(setValue);

    setModels(resetModels());
    setModels(openReviewTemplateSelect());
  };

  const ActionBtn = ({ data: obj, index }) => {
    const isApproved =
      obj?.contractDocumentIds.filter((val) => val.isApproved === "approved")
        .length === obj?.contractDocumentIds.length;
    const idRejected = !!obj?.contractDocumentIds.filter(
      (val) => val.isApproved === "rejected"
    ).length;

    if (obj?.status === "pending") {
      return (
        <GenerateLinkBtn
          onClick={() => {
            onGenerateLink(obj);
          }}
          obj={obj}
          md={12}
        />
      );
    } else if (obj?.status === "rejected") {
      return (
        <GenerateLinkBtn
          onClick={() => {
            onGenerateLink(obj);
          }}
          obj={obj}
          md={12}
        />
      );
    } else if (obj?.status === "pending_others") {
      return (
        <ViewContractBtn
          onClick={() => {
            onReviewLink(obj);
          }}
          obj={obj}
          md={12}
        />
      );
    } else if (obj?.status === "signed") {
      if (!isApproved && !idRejected) {
        return (
          <ReviewContractBtn
            onClick={() => {
              onReviewLink(obj);
            }}
            obj={obj}
            md={12}
          />
        );
      } else if (idRejected) {
        return (
          <ViewContractBtn
            onClick={() => {
              onReviewLink(obj);
            }}
            obj={obj}
            md={12}
          />
        );
        return null;
      } else if (isApproved) {
        return (
          <ViewContractBtn
            onClick={() => {
              onReviewLink(obj);
            }}
            obj={obj}
            md={12}
          />
        );
      }
    } else {
      return <ViewContractBtn onClick={() => {}} obj={obj} md={12} />;
    }
  };

  const ListClientsAndState = ({ data: obj }) => {
    console.log(obj)
    let getNameAndStatusList = []
    
    obj?.recipient.forEach((item, i) => {
      obj?.recipientsStatus.forEach((o, i) => {
        if(item.id == o.recipient) {
          getNameAndStatusList.push({
            name: item.name,
            status: o.status,
          })
        }
      })
    })

    console.log(getNameAndStatusList)

    const classValue = (status) => {  
      if (status === "pending") {
        return "document-pending";
      } else if (status === "pending_others") {
        return "document-pending";
      } else if (status === "rejected") {
        return "contact-wait";
      } else if (status === "signed") {
        return "document-success";
      } else {
        return "document-success";
      }
    };

    const labelValue = (status) => {
      if (status === "pending") {
        return "Aguardando Assinatura";
      } else if (status === "rejected") {
        return "Assinatura recusada";
      } else if (status === "signed") {
        return "Aprovado";
      } else if (status === "pending_others") {
        return "Aguardando todas as assinaturas"
      } else {
        return "Assinada";
      }
    };

    return (
      <div width={isDesktop ? "25%" : "50%"} style={{ paddingBottom: '5px', paddingTop: '50px' }} className="container d-flex flex-column mb-3">
        <div className="container mt-1 mb-3 overflow-auto" style={{ maxHeight: '600px' }}>
        {getNameAndStatusList.map((item, index) => {
          return (
            <div className="row" style={{ marginBottom: index < getNameAndStatusList.length - 1 ? '15px' : '5px', marginTop: '5px' }} key={index}>
              <div className="col-md-6">
                <p className="mb-0 fw-bold">Nome - {item.name}</p>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <p className="mb-0 mr-4 ml-5 fw-bold">Status de Assinatura</p>
                <p style={{ width: '10px'}}/>
                <Button
                  className={`${classValue(item.status)} mr-2 -none d-md-table-cell fw-bold`}
                  style={{
                    width: "150px",
                    fontSize: "12px",
                    borderRadius: "3px",
                    border: "0px",
                    fontWeight: "normal",
                    padding: "0",
                  }}
                >
                  {labelValue(item.status)}
                </Button>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    );
    
    
  }

  return (
    <div>
      {/* <Suspense fallback={<Loader />}> */}
      <Table responsive>
        {tableData?.length ? (
          <thead>
            <tr style={{ color: "#B5B6B7", fontSize: "12px" }}>
              <th width={isDesktop ? "25%" : "50%"}>Nome</th>
              <th>Status do cliente</th>
              <th className="d-none d-md-table-cell">Status do contrato</th>
            </tr>
          </thead>
        ) : (
          ""
        )}
        {tableData?.length ? (
          <tbody>
            {tableData?.map((obj, i) => (
              <>
                <tr
                  id="contractTable"
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
                  <>  
                    <Row
                      className="position-absolute mt-5 my-2"
                      style={{
                        left: "0",
                        bottom: "",
                        width: "100%",
                        top: "",
                        maxHeight: "200px", // Defina uma altura máxima aqui
                        overflowY: idArray.includes(obj.id) ? "scroll" : "unset",
                      }}
                    >
                      <ListClientsAndState data={obj}/>

                      <ActionBtn style={{
                        padding: '40px'
                      }} data={obj} index={i} />
                    </Row>
                    </>
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
        show={tableDataArray?.findData?.length && tableDataArray?.totalFindData}
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
