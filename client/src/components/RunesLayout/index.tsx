import React from "react";
import { Container, Image } from "theme-ui";
import { css } from "@emotion/react";

const runesContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  .rune-col {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 1rem;
    width: 50%;
  }

  .rune-row {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 1rem 0;
    width: 100%;

    img.category {
      width: 50px;
    }
  }
`;

const RunesLayout = () => {
  return (
    <Container css={runesContainer}>
      <div className="rune-col">
        <div className="rune-row">
          <Image
            className="category"
            src="https://fastcdn.mobalytics.gg/assets/lol/images/perks/8000.png"
          />
          <Image
            className="category"
            src="https://fastcdn.mobalytics.gg/assets/lol/images/perks/8100.png"
          />
          <Image
            className="category"
            src="https://fastcdn.mobalytics.gg/assets/lol/images/perks/8200.png"
          />
          <Image
            className="category"
            src="https://fastcdn.mobalytics.gg/assets/lol/images/perks/8400.png"
          />
          <Image
            className="category"
            src="https://fastcdn.mobalytics.gg/assets/lol/images/perks/8300.png"
          />
        </div>
      </div>
      {/*<div className="rune-col"></div>*/}
    </Container>
  );
};

export default RunesLayout;
