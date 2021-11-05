import React from "react";
import { css } from "@emotion/react";

const Error: React.FC = () => {
  return (
    <div css={errorWrapper}>
      <h1>data not found...</h1>
    </div>
  );
};

export default Error;

const errorWrapper = css`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  h1 {
    color: white;
  }
`;
