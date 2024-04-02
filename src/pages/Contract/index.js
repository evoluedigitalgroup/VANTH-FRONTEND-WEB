import React, { Suspense, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
//
import { PAGE_LIMIT } from "../../config";
import ContractTable from "./ContractTable";
import AfterAuth from "../../HOC/AfterAuth";
import Loader from "../../components/Loader";
import TableNavbar from "../../components/TableNavbar";
import { usageAtom } from "../../recoil/UsageAtoms/Usage";
import { getContractList, updateContractApprovalStatus } from "./api";
import {
  contractModels,
  contractNewFileSelected,
  contractSelectedUser,
  contractTableData,
  profileAtom,
  showTutorialAtom,
} from "../../recoil/Atoms";
import SelectClientModal from "./NewContract/SelectClientModal";
import SelectTemplateModal from "./NewContract/SelectTemplateModal";
import {
  openReviewTemplateSelect,
  openSelectClient,
  resetModels,
} from "../../recoil/helpers/contractModels";
import ContractCopylinkModal from "./NewContract/ContractCopylinkModal";
import ReviewAndInformationModal from "./NewContract/ReviewAndInformationModal";
import SelectContractReviewModal from "./Model/SelectContractReviewModal";
import {
  contractPaginationData,
  toReloadContractData,
} from "../../recoil/PaginationAtoms/Contract";
import { Helmet } from "react-helmet";
import ReviewContractModal from "./Model/ReviewContractModal";
import { contractApprovalDataAtom } from "../../recoil/ContractAtoms/Templates";
import { toast } from "react-toastify";

const ContractData = ({
  search,
  tableRow,
  refresh,
  setRefresh,
  setTableRow,
  searchResult,
  setSearchResult,
  filterVal,
  active,
  setActive,
  handleShowRow,
  idArray,
  setContractLink,
  setReviewTemplates,
}) => {
  const tableData = useRecoilValue(
    contractPaginationData(searchResult ? search : (search = ""))
  );
  const [reloadVal, reloadData] = useRecoilState(toReloadContractData);
  const totalPage = Math.ceil((tableData?.totalFindData || 1) / PAGE_LIMIT);
  const [table, setTable] = useRecoilState(contractTableData);

  console.log("tableData", tableData);

  useEffect(() => {
    reloadData(reloadVal + 1);
    setSearchResult(false);
  }, [refresh]);
  useEffect(() => {
    // setTable(tableData?.findData);
    setTableRow(tableData?.findData);
  }, [tableData]);

  useEffect(() => {
    handleToggle();
  }, [filterVal]);

  const handleToggle = () => {
    if (filterVal === "Pending") {
      setActive({
        pending: true,
        approved: false,
        all: false,
      });

      const newData = tableData?.findData.filter((obj) => {
        if (obj.status === "pending") {
          return obj;
        }
      });
      setTableRow(newData);
    } else if (filterVal === "Responded") {
      setActive({
        pending: false,
        approved: true,
        all: false,
      });
      const newData = tableData?.findData.filter((obj) => {
        if (obj.status === "signed" || obj.status === "declined") {
          return obj;
        }
      });
      setTableRow(newData);
    } else {
      setActive({
        pending: false,
        approved: false,
        all: true,
      });
      setTableRow(tableData?.findData);
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <ContractTable
        tableRow={tableRow}
        refresh={refresh}
        setRefresh={setRefresh}
        tableDataArray={tableData}
        totalPage={totalPage}
        handleShowRow={handleShowRow}
        idArray={idArray}
        setContractLink={setContractLink}
        setReviewTemplates={setReviewTemplates}
      />
    </Suspense>
  );
};

const Contact = () => {
  const navigate = useNavigate();

  const usage = useRecoilValue(usageAtom);
  const profile = useRecoilValue(profileAtom);
  const [tableRow, setTableRow] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState({
    pending: false,
    approved: false,
    all: true,
  });
  const [contractApprovalData, setContractApprovalData] = useRecoilState(
    contractApprovalDataAtom
  );
  const [contractLink, setContractLink] = useState(false);
  const [filterVal, setFilterVal] = useState("All");

  const [search, setSearch] = useState();

  const [searchResult, setSearchResult] = useState(false);

  const [show, setShow] = useState(false);

  const [newTableRow, setNewtableRow] = useState([]);

  const [reviewTemplates, setReviewTemplates] = useState([]);

  const [idArray, setIdArray] = useState([]);
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);

  const [table, setTable] = useRecoilState(contractTableData);
  const [models, setModels] = useRecoilState(contractModels);
  const selectedOption = useRecoilValue(contractSelectedUser);
  const selectedPdf = useRecoilValue(contractNewFileSelected);
  const [tutorialValue, setTutorialValue] = useRecoilState(showTutorialAtom);

  useEffect(() => {
    setLoading(true);
    const submitData = {
      search,
    };
    getContractList(submitData).then((res) => {
      if (res.success) {
        setTable(res.data.findData);
        setTableRow(res.data.findData);
        setLoading(false);
      } else {
        setTable([]);
        setTableRow([]);
        setLoading(false);
      }
    });

    console.log("selectedPdf : ", selectedPdf);
  }, [refresh, selectedPdf]);

  const onEnter = (e) => {
    if (e.key === "Enter") {
      // reloadData(reloadVal + 1);
      setSearchResult(true);
    } else {
      // setSearch("");
      setSearchResult(false);
    }
  };

  const handleShowRow = (id) => {
    setOpen(!open);
    setId(id);

    if (idArray.includes(id)) {
      var index = idArray.indexOf(id);
      if (index !== -1) {
        idArray.splice(index, 1);
      }
    } else {
      setIdArray((old) => [...old, id]);
    }
  };

  const reviewContractSubmitHandle = async (action) => {
    const response = await updateContractApprovalStatus({
      contractId: contractApprovalData?.id,
      documentId: contractApprovalData?.documentId,
      uuid: contractApprovalData?.uuid,
      action: action,
    });

    if (response.success) {
      toast.success(response.message);

      const reviewTemplatesData = { ...reviewTemplates };
      const documentsData = [...reviewTemplatesData.data.contractDocumentIds];

      const updatedData = documentsData.map((obj) => {
        if (obj.documentId === contractApprovalData.documentId) {
          return {
            ...obj,
            isApproved: action,
          };
        }
        return {
          ...obj,
        };
      });

      const updatedTemplates = {
        ...reviewTemplates,
        data: {
          ...reviewTemplates.data,
          contractDocumentIds: updatedData,
        },
      };

      setReviewTemplates(updatedTemplates);
      setModels(openReviewTemplateSelect());
      setRefresh(refresh + 1);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Vanth System | Contratos</title>
      </Helmet>
      <AfterAuth>
        <div className="d-flex align-items-center justify-content-between mt-4 mx-md-5 mx-3">
          <h2 className="">Contratos</h2>
          <button
            id="newContratoAddButton"
            onClick={() => {
              if (usage?.digitalSignatures?.percent === 100) {
                navigate("/profile/my-plan");
              } else {
                setModels(openSelectClient());
              }
            }}
            className="py-2 px-3"
            style={{
              background: "#0068FF",
              border: "0",
              borderRadius: "6px",
              color: "white",
              fontWeight: 700,
            }}
          >
            Novo contrato
          </button>
        </div>
        <Card className="m-md-5 mx-md-5 my-md-3 p-3 px-md-4 cardComponent">
          {/* <NAVBAR /> */}
          <TableNavbar
            title={"Contratos"}
            setSearch={setSearch}
            onEnter={onEnter}
            refresh={refresh}
            setRefresh={setRefresh}
            search={search}
            setActive={setActive}
            active={active}
          >
            <div className="">
              <Button
                className={`fs-color mx-2 border-0 ${
                  active.pending ? "activeBtnTable" : "inActiveBtnTable"
                }`}
                onClick={(e) => setFilterVal("Pending")}
              >
                Pendentes
              </Button>
              <Button
                className={`fs-color  mx-2 border-0 ${
                  active.approved ? "activeBtnTable" : "inActiveBtnTable"
                }`}
                onClick={(e) => setFilterVal("Responded")}
              >
                Respondidas
              </Button>
              <Button
                className={`fs-color px-4 border-0 ${
                  active.all ? "activeBtnTable" : "inActiveBtnTable"
                }`}
                onClick={(e) => setFilterVal("All")}
              >
                Todos
              </Button>
            </div>
          </TableNavbar>

          <Suspense fallback={<Loader />}>
            <ContractData
              tableRow={tableRow}
              refresh={refresh}
              setRefresh={setRefresh}
              search={search}
              setTableRow={setTableRow}
              searchResult={searchResult}
              setSearchResult={setSearchResult}
              handleShowRow={handleShowRow}
              filterVal={filterVal}
              active={active}
              setActive={setActive}
              idArray={idArray}
              setContractLink={setContractLink}
              setReviewTemplates={setReviewTemplates}
            />
          </Suspense>
        </Card>
        <SelectClientModal
          show={models.selectClient}
          onHide={() => setModels(resetModels())}
        />
        <div>
          <SelectTemplateModal
            selectedOption={selectedOption}
            show={models.selectTemplate}
            onHide={() => setModels(resetModels())}
          />
        </div>
        <div>
          <ContractCopylinkModal
            selectedOption={selectedOption}
            show={models.previewContract}
            onHide={() => {
              setModels(resetModels());
              setContractLink(false);
            }}
            refresh={refresh}
            setRefresh={setRefresh}
            link={contractLink}
          />
        </div>
        <div>
          <ReviewAndInformationModal
            show={models.pdfEditor}
            title={"Revisar modelo e informações"}
            selectedPdf={selectedPdf}
            onHide={() => setModels(resetModels())}
            selectedOption={selectedOption}
          />
        </div>
        <div>
          <SelectContractReviewModal
            show={models.reviewTemplateSelect}
            onHide={() => {
              setModels(resetModels());
              setRefresh(refresh + 1);
            }}
            templatesData={reviewTemplates}
          />
        </div>
        <div>
          <ReviewContractModal
            show={models.contractReview}
            onHide={() => {
              setModels(resetModels());
              setContractApprovalData(null);
            }}
            url={contractApprovalData?.url}
            handleSubmit={reviewContractSubmitHandle}
            showButtons={contractApprovalData?.showButtons}
            data={contractApprovalData?.data}
            setReviewTemplates={setReviewTemplates}
          />
        </div>
      </AfterAuth>
    </>
  );
};

export default Contact;
