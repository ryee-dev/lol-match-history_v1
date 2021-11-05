import { css } from "@emotion/react";

const formContainer = css`
  height: 100%;
  background-color: #dadddf;
  border-radius: 4px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  //z-index: 2;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.4);

  overflow: auto;

  h1 {
    color: white;
  }
`;

const summonerForm = css`
  width: 100%;
  margin-top: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 6px;
`;

const summInput = css`
  //box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.25);
  outline: none;
  border: none;
  padding: 0.6rem 1rem;
  //width: 25%;
  border-radius: 2px;
  margin: 1rem;
  transition: all 0.2s ease-in-out;
  background-color: #f3f8ff;
  caret-color: #565b63;
  color: #565b63;
  width: 25%;

  ::placeholder {
    color: #565b63;
  }

  &:focus {
    transform: scale(1.15);
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.15);
  }
`;

const submitButt = css`
  //width: 10%;
  margin-top: 1rem;
  padding: 0.6rem 2rem;
  text-decoration: none;
  outline: none;
  //border: none;
  border-radius: 6px;
  background-color: transparent;
  border: solid #5d5e5a 1px;
  //color: white;
  color: #5d5e5a;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;

  transition: background-color 0.2s ease-in-out, letter-spacing 0.2s ease-in-out,
    color 0.2s ease-in-out;

  &:hover {
    //width: 25%;
    background-color: #5d5e5a;
    //letter-spacing: 4px;
    color: white;
  }

  &:disabled {
    opacity: 0.4;

    &:hover {
      background-color: transparent;
      color: #5d5e5a;
      //color: #1380f0;
      cursor: default;
    }
  }
`;

export { summonerForm, formContainer, summInput, submitButt };
