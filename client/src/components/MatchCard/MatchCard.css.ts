import { css } from "@emotion/react";

const cardWrapper = css`
  height: auto;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.4rem 0;
  color: #1c222b;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  width: 800px;

  p {
    font-size: 1rem;
    margin: 0;
  }

  img.spell {
    //margin: 0.2rem 0;
  }

  img.rune {
    max-height: 30px;
    max-width: 30px;
    margin: 0.2rem;
  }

  .list {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
`;

const cardRow = css`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  //border: 1px dotted black;
`;

const cardCol = css`
  width: 100%;
  height: 100%;
  margin: 0 0.4rem;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: flex-start;

  &.center {
    align-items: center;
    padding: 0 0.5rem;
  }

  .spell {
    max-width: 40px;
    margin: 0.5rem 5px 0 5px;
  }

  .items {
    img {
      margin: 1rem;
    }
  }
`;

const itemContainer = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-direction: column;

  div {
    &.row {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 0.1rem 0;
    }

    &.img-wrapper {
      margin: 0 0.1rem;
      height: 50px;
      width: 50px;

      .empty {
        height: 100%;
        width: 100%;
        background-color: white;
        opacity: 0.5;
      }
    }
  }

  img {
    height: 50px;
    width: 50px;
    //border: 2px solid white;
    //background-color: white;
  }
`;

const runeWrapper = css`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  //margin-bottom: 0.2rem;
  margin: 0 0.4rem 0.2rem 0.4rem;

  img {
    margin: 0 0.2rem;
  }

  .col {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  }
`;

export { cardCol, cardRow, cardWrapper, runeWrapper, itemContainer };
