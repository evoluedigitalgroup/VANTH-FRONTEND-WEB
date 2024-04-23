import React from "react";
import { Button } from "react-bootstrap";

export default function GenerateLinkBtn({ onClick }) {
  return (
    <Button
      className="border-0 px-4"
      onClick={onClick}
      style={{
        background: "#1C3D59",
      }}
    >
      Gerar link
    </Button>
  );
};
