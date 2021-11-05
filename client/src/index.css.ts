import { css } from "@emotion/react";

export const appShell = css`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 4rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f6f5f5;
  overflow: auto;
  font-family: "Kyrial Display Pro", sans-serif;

  .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 2rem 2rem 0 0;
    z-index: 3;

    &:hover {
      cursor: pointer;
    }
  }

  h1 {
    font-family: Leixo, sans-serif;
    font-size: 1.8rem;
    transition: letter-spacing 0.4s ease-in-out, font-size 0.4s ease-in-out;
  }

  a {
    text-decoration: none;
  }
`;

export const appOverlay = css`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: black;
  opacity: 0.75;
  z-index: 1;
`;

export const modalWrapper = css`
  position: absolute;
  max-width: 960px;
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 6px;
  z-index: 2;
  box-sizing: border-box;
`;
