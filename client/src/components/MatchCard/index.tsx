import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { MatchDataProps, MatchProps } from "@/utils/types";
import { Box } from "theme-ui";
import RunesLayout from "../RunesLayout";
import { handleConvertSecToMin } from "@/utils/helpers";

import { cardCol, cardRow, cardWrapper, itemContainer } from "./MatchCard.css";

const MatchCard: React.FC<MatchProps> = (props: MatchProps) => {
  const {
    staticData,
    gameMode,
    win,
    gameDuration,
    gameStartTimestamp,
    summAId,
    summBId,
    items,
    championName,
    kills,
    deaths,
    assists,
    kda,
    champLevel,
    totalMinionsKilled,
    neutralMinionsKilled,
    neutralMinionsKilledTeamJungle,
    neutralMinionsKilledEnemyJungle,
  } = props;

  const [matchData, setMatchData] = useState<MatchDataProps>({
    championName: ``,
    spells: {
      summAName: ``,
      summBName: ``,
      summAId: 0,
      summBId: 0,
    },
    items: {
      item0: 0,
      item1: 0,
      item2: 0,
      item3: 0,
      item4: 0,
      item5: 0,
      item6: 0,
    },
  });

  const [gameLength, setGameLength] = useState(``);

  const getTotalCS = () => {
    let total;
    if (
      neutralMinionsKilledTeamJungle === undefined ||
      neutralMinionsKilledEnemyJungle === undefined
    ) {
      total = totalMinionsKilled + neutralMinionsKilled;
    } else {
      total =
        totalMinionsKilled +
        neutralMinionsKilled +
        neutralMinionsKilledTeamJungle +
        neutralMinionsKilledEnemyJungle;
    }
    return total;
  };

  const getCsPerMin = () => {
    const csPerMin = getTotalCS() / Math.floor(gameDuration / 60);
    return csPerMin.toFixed(1);
  };

  useEffect(() => {
    const { item0, item1, item2, item3, item4, item5, item6 } = items;
    setMatchData({
      championName: staticData.champions[championName],
      spells: {
        summAName: staticData.spells[summAId],
        summBName: staticData.spells[summBId],
        summAId,
        summBId,
      },
      items: {
        item0,
        item1,
        item2,
        item3,
        item4,
        item5,
        item6,
      },
    });
  }, []);

  useEffect(() => {
    setGameLength(handleConvertSecToMin(gameDuration));
  }, [gameDuration, gameStartTimestamp]);

  return (
    <Box
      css={cardWrapper}
      style={
        win ? { backgroundColor: `#b6f7c1` } : { backgroundColor: `#ffcccc` }
      }
    >
      <Box css={cardRow} className="list">
        <Box css={cardCol}>
          <h3 style={{ fontWeight: `bold` }}>{gameMode}</h3>
          {win ? (
            <h3 style={{ color: `#91b859` }}>Victory</h3>
          ) : (
            <h3 style={{ color: `#f07178` }}>Defeat</h3>
          )}
          <p>{gameLength}</p>
        </Box>
        <Box css={cardCol} className="center">
          <img
            className="champion"
            src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/champion/${matchData.championName}.png`}
            alt={`${matchData.championName}`}
            data-tip={`${matchData.championName}`}
          />
          <ReactTooltip place="top" type="dark" effect="float" />
          <Box css={cardRow}>
            <img
              className="spell"
              src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/spell/${matchData.spells.summAName}.png`}
              alt={`${matchData.spells.summAName}`}
            />
            <img
              className="spell"
              src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/spell/${matchData.spells.summBName}.png`}
              alt={`${matchData.spells.summBName}`}
            />
          </Box>
        </Box>

        <Box css={cardCol} className="center">
          <p>
            {kills}/<span style={{ color: `#be3044` }}>{deaths}</span>/{assists}
          </p>
          {deaths === 0 ? <p>Perfect</p> : <p>{kda}:1 KDA</p>}

          <p>level: {champLevel}</p>
          <p>
            {getTotalCS()} ({getCsPerMin()}) CS
          </p>
        </Box>
        <Box css={cardCol} className="items">
          <Box css={itemContainer}>
            <div className="row">
              <div className="img-wrapper">
                {matchData.items.item0 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/item/${matchData.items.item0}.png`}
                    alt={`${matchData.items.item0}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item1 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/item/${matchData.items.item1}.png`}
                    alt={`${matchData.items.item1}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item2 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/item/${matchData.items.item2}.png`}
                    alt={`${matchData.items.item2}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item6 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/item/${matchData.items.item6}.png`}
                    alt={`${matchData.items.item6}`}
                    style={{
                      marginLeft: `0.4rem`,
                      maxWidth: `25px`,
                      maxHeight: `25px`,
                    }}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
            </div>
            <div className="row">
              <div className="img-wrapper">
                {matchData.items.item4 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/item/${matchData.items.item4}.png`}
                    alt={`${matchData.items.item4}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item5 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/item/${matchData.items.item5}.png`}
                    alt={`${matchData.items.item5}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item3 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/item/${matchData.items.item3}.png`}
                    alt={`${matchData.items.item3}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
            </div>
          </Box>
        </Box>
        <RunesLayout />
        {/*<RuneWrapper>*/}
        {/*<div className="col">*/}
        {/*  <img*/}
        {/*    className="rune"*/}
        {/*    src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.keystone}.png`}*/}
        {/*    alt={`${matchData.runes.keystone}`}*/}
        {/*  />*/}
        {/*  <img*/}
        {/*    className="rune"*/}
        {/*    src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.primaryRune1}.png`}*/}
        {/*    alt={`${matchData.runes.primaryRune1}`}*/}
        {/*  />*/}
        {/*  <img*/}
        {/*    className="rune"*/}
        {/*    src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.primaryRune2}.png`}*/}
        {/*    alt={`${matchData.runes.primaryRune2}`}*/}
        {/*  />*/}
        {/*  <img*/}
        {/*    className="rune"*/}
        {/*    src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.primaryRune3}.png`}*/}
        {/*    alt={`${matchData.runes.primaryRune3}`}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className="col">*/}
        {/*  <img*/}
        {/*    className="rune"*/}
        {/*    src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.secondaryRune1}.png`}*/}
        {/*    alt={`${matchData.runes.secondaryRune1}`}*/}
        {/*  />*/}
        {/*  <img*/}
        {/*    className="rune"*/}
        {/*    src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.secondaryRune2}.png`}*/}
        {/*    alt={`${matchData.runes.secondaryRune2}`}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*</RuneWrapper>*/}
      </Box>
    </Box>
  );
};

export default MatchCard;
