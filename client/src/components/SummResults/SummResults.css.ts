import { css } from "@emotion/react";

const resultsModal = css`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;

  svg {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
  }
`;

const listWrapper = css`
  //height: 50%;
  //padding: 0 2rem;
  position: absolute;
  //padding: 0 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  background-color: #dadddf;
  overflow: auto;
  //max-width: 800px;

  h1 {
    font-family: Paralucent, sans-serif;
    font-weight: lighter;
    letter-spacing: 4px;
    text-transform: lowercase;
    font-size: 3rem;
    color: #212121;
    text-align: left;
    min-width: 800px;
  }
`;

export { resultsModal, listWrapper };
