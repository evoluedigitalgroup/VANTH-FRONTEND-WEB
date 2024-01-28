import React, { useEffect } from "react";
import Loader from "../components/Loader";
import { updateContractStatus } from "../helper/API/contract";
import { useQuery } from "../helper";

const DocuSignReturn = () => {
  const query = useQuery();

  const [loading, setLoading] = React.useState(true);

  const [response, setResponse] = React.useState(null);

  const updateDetails = async () => {

    const res = await updateContractStatus({
      query: query.toString()
    });
    console.log(' res ', res.data);
    if (res.success) {
      setResponse(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    updateDetails();
  }, []);


  const RenderingResponse = () => {
    if (response === 'signed') {
      return (
        <div className="d-flex mt-5 flex-column align-items-center justify-content-center w-100">
          <h4 className="fw-bold mt-5">Contrato assinado com sucesso!</h4>
          <img src="/assets/img/success.png" style={{ height: 200 }} />
        </div>
      );
    } else if (response === 'rejected') {
      return (
        <div className="d-flex mt-5 flex-column align-items-center justify-content-center w-100">
          <h4 className="fw-bold mt-5">Contrato recusado!</h4>
          <img src="/assets/img/info.png" style={{ height: 200 }} />
        </div>
      );
    }
    return (
      <div className="d-flex mt-5 flex-column align-items-center justify-content-center w-100">
        <h4 className="fw-bold mt-5">Algo deu errado</h4>
        <img src="/assets/img/info.png" style={{ height: 200 }} />
      </div>
    );
  }

  return (
    <>
      <div
        className="d-flex"
        style={{
          height: "100%",
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
    </>
  );
};

export default DocuSignReturn;
