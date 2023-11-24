import React from "react";

const UpgradePlan = () => {
  return (
    <div>
      <div
        className="p-3"
        style={{
          border: "1px solid #0068FF",
          height: "170px",
          width: "260px",
          borderRadius: "12px",
        }}
      >
        <div>
          <h6 className="m-0" style={{ fontSize: "14px", color: "#0068FF" }}>
            <span style={{ fontWeight: 700 }}>+10</span> Assinaturas de
            contratos
          </h6>
          <small
            style={{ fontSize: "12px", color: "#97A7BA", fontWeight: "500" }}
          >
            35 assinaturas no total
          </small>
          <p className="mt-1" style={{ fontSize: "10px", color: "#97A7BA" }}>
            este pacote será cobrado somente uma vez, e terá validade até o
            final do mes em que foi adquirido (31/10/2023).
          </p>
          <div className="d-flex gap-2 ">
            <button
              className="px-3 py-1"
              style={{
                background: "#0068FF",
                color: "white",
                border: "0",
                borderRadius: "5px",
                fontSize: "10px",
              }}
            >
              Comprar
            </button>
            <span
              className=""
              style={{ color: "#0068FF", fontSize: "14px", fontWeight: 700 }}
            >
              R$ 40,00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlan;
