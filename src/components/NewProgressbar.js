import React, { useEffect } from "react";

const NewProgressbar = ({ bgcolor, progress, height, title, title1 }) => {
  // useEffect(() => {
  //   setPercentage();
  // }, []);

  // function setPercentage() {
  //   const progressContainer = document.querySelector(".progress-container");

  //   const percentage = progressContainer.getAttribute("data-percentage") + "%";

  //   const progressEl = progressContainer.querySelector(".progress");
  //   const percentageEl = document.querySelector(".percentage");

  //     progressEl.style.width = percentage;
  //     percentageEl.innerText = percentage;
  //     percentageEl.style.left =
  //       window.screen.orientation.type === "landscape-primary"
  //         ? parseInt(percentage) > 2
  //           ? percentage
  //           : "0.5%"
  //         : parseInt(percentage) > 4
  //         ? percentage
  //         : "4%";
  // }

  const Parentdiv = {
    height: 3,
    width: "100%",
    backgroundColor: "#CED4DB",
    borderRadius: 40,
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: "right",
    position: "relative",
    display: "flex",
    justifyContent: "end",
  };

  const progresstext = {
    color: "#97A7BA",
    fontSize: "12px",
  };

  return (
    <>
      <span style={{ fontSize: "12px", color: "#97A7BA" }}>
        <span>{title}</span>(<span style={progresstext}>{`${progress}%`}</span>
        {title1 ? <span> {title1}</span> : ""})
      </span>
      <div style={Parentdiv}>
        <div style={Childdiv}>
          <div
            style={{
              height: "12px",
              width: "12px",
              background: bgcolor,
              borderRadius: "50%",
              position: "absolute",
              top: "-4px",
              border: "2px solid white",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default NewProgressbar;
