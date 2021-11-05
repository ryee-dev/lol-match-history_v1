import React from "react";
import MatchCard from "../MatchCard";

import { listWrapper, resultsModal } from "./SummResults.css";
import { ResultsProps } from "@/utils/types";

const SummResults: React.FC<ResultsProps> = (props: ResultsProps) => {
  const { data, summQuery, staticData } = props;

  // React.useEffect(() => {
  //   console.log(data);
  // }, [data]);

  // for (let i = 0; i < 5; i++) {
  //   console.log(data.hits[i].gameDuration + data.hits[i].gameStartTimestamp);
  // }

  return (
    <div css={resultsModal}>
      <div css={listWrapper}>
        <h1>{summQuery}</h1>
        {data.map((match: any, index: number) => {
          // console.log(match);
          return (
            match.creepScore !== undefined && (
              <MatchCard
                staticData={staticData}
                key={index}
                gameMode={match.gameMode}
                win={match.outcome}
                gameDuration={match.gameDuration}
                gameStartTimestamp={match.gameStartTimestamp}
                summonerName={match.summonerName}
                summAId={match.spell1Id}
                summBId={match.spell2Id}
                championName={match.championId}
                kills={match.kills}
                deaths={match.deaths}
                assists={match.assists}
                kda={match.kda}
                items={match.items}
                champLevel={match.championLevel}
                totalMinionsKilled={match.creepScore.totalMinionsKilled | 0}
                neutralMinionsKilled={match.creepScore.neutralMinionsKilled | 0}
                neutralMinionsKilledTeamJungle={
                  match.creepScore.neutralMinionsKilledTeamJungle | 0
                }
                neutralMinionsKilledEnemyJungle={
                  match.creepScore.neutralMinionsKilledEnemyJungle | 0
                }
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default SummResults;
