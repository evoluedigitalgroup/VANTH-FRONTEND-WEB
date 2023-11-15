import React, { useEffect } from "react";

const NewProgressbar = ({ dataPercentage, text, text1 }) => {
  useEffect(() => {
    setPercentage();
  }, [dataPercentage]);

  function setPercentage() {
    const progressContainer = document.querySelector(".progress-container");

    const percentage = progressContainer.getAttribute("data-percentage") + "%";

    const progressEl = progressContainer.querySelector(".progress");
    const percentageEl = document.querySelector(".percentage");

    progressEl.style.width = percentage;
    percentageEl.innerText = percentage;
    percentageEl.style.left =
      window.screen.orientation.type === "landscape-primary"
        ? parseInt(percentage) > 2
          ? percentage
          : "0.5%"
        : parseInt(percentage) > 4
        ? percentage
        : "4%";
  }

  return (
    <div>
      <span style={{ fontSize: "12px", color: "#97A7BA" }}>
        {text} (<span className="percentage"></span>
        &nbsp; {text1})
      </span>
      <div className="progress-container" data-percentage={dataPercentage}>
        <div className="progress"></div>
      </div>
      <span style={{ fontSize: "12px", color: "#97A7BA" }}>
        10 GB de 20 GB {text1}
      </span>
    </div>
  );
};

export default NewProgressbar;
