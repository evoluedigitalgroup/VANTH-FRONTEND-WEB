import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import Loader from "../../../components/Loader";
import { useParams } from "react-router-dom";
import { getPublicContractDetails } from "../../Contract/api";
import { incrementCounter } from "../../../helper/API/auth";

const RequestedSignature = () => {
  const params = useParams();
  const [loading, setLoading] = React.useState(true);

  const [responseType, setResponseType] = React.useState(null);
  const [contractData, setContractData] = React.useState(null);

  const getDetails = async () => {
    console.log('params : ', params)
    const { companyId, contractId, docusignEnvelopeId, recipientViwer } = params;

    const res = await getPublicContractDetails({
      companyId,
      contractId,
      docusignEnvelopeId,
      recipientViwer
    });
    console.log(' res ', res.data);
      if (res.success) {
        setContractData(res.data);
        setResponseType(res.data?.status);
      } else {
        setContractData(res.data?.ableRecipient)
        setResponseType(false)
      }
    setLoading(false);
  };

  const incrementVisiterCounter = () => {
    const { companyId } = params;
    const submitData = {
      company: companyId
    }

    incrementCounter(submitData);
  }

  useEffect(() => {
    getDetails();
    incrementVisiterCounter();
  }, []);


  const RenderingResponse = () => {
    if (responseType === 'pending') {
      return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100">
          <iframe src={contractData?.docusignUrl} style={{ height: '100%', width: '100%' }} />
        </div>
      );
    } else if (responseType === 'signed') {
      return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100">
          <h4 className="fw-bold">Contrato assinado com sucesso!</h4>
          <img src="/assets/img/success.png" style={{ height: 200 }} />
        </div>
      );
    } else if (responseType === 'pending_others') {
      return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100">
          <iframe src={contractData?.docusignUrl} style={{ height: '100%', width: '100%' }} />
        </div>
      );
    } else if (responseType === 'rejected') {
      return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100">
          <h4 className="fw-bold">Contrato recusado!</h4>
          <img src="/assets/img/info.png" style={{ height: 200 }} />
        </div>
      );
    } else if (!responseType) {
      return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100">
          <h4 className="fw-bold">Aguarde {contractData[0].name} para assinar!</h4>
          <img src="/assets/img/info.png" style={{ height: 200 }} />
        </div>
      );
    }

    return null
  }

  return (
    <>
      <div className="Dashboard d-flex flex-column align-items-center justify-content-center h-100 py-3">
        <div className="TBA-Logo d-flex align-items-center justify-content-center">
          <img src="/assets/img/vancehDigital.svg" style={{ height: 200 }} />
        </div>
        <Card className="m-2 p-4" style={{ width: "80%" }}>
          {
            (!loading && responseType === 'pending') ? (
              <h6 className="fw-bold">
                {contractData?.company?.companyName} solicitou a assinatura do seguinte documento:
              </h6>
            ) : null
          }
          <div
            className="d-flex"
            style={{
              height: "80vh",
              width: "100%",
            }}
          >
            {
              loading ? (
                <div style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Loader />
                </div>
              ) : (
                <RenderingResponse />
              )
            }
          </div>
        </Card>
      </div>
    </>
  );
};

export default RequestedSignature;
