interface MatchProps {
  staticData: any;
  key: number;
  gameMode: any;
  win: string;
  gameDuration: number;
  gameStartTimestamp: number;
  summonerName: string;
  championName: string;
  summAId: number;
  summBId: number;
  // keystone: number;
  // primaryRune1: number;
  // primaryRune2: number;
  // primaryRune3: number;
  // secondaryRune1: number;
  // secondaryRune2: number;
  items: {
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    item6: number;
  };
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  champLevel: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  neutralMinionsKilledTeamJungle: number;
  neutralMinionsKilledEnemyJungle: number;
}

interface MatchDataProps {
  championName: string | Promise<any>;
  spells: {
    summAName: string | Promise<any>;
    summBName: string | Promise<any>;
    summAId: number | Promise<any>;
    summBId: number | Promise<any>;
  };
  // runes: {
  //   keystone: number | Promise<any>;
  //   primaryRune1: number | Promise<any>;
  //   primaryRune2: number | Promise<any>;
  //   primaryRune3: number | Promise<any>;
  //   secondaryRune1: number | Promise<any>;
  //   secondaryRune2: number | Promise<any>;
  // };
  items: {
    item0: number | Promise<any>;
    item1: number | Promise<any>;
    item2: number | Promise<any>;
    item3: number | Promise<any>;
    item4: number | Promise<any>;
    item5: number | Promise<any>;
    item6: number | Promise<any>;
  };
}

interface ResultsProps {
  data: any;
  summQuery: string;
  staticData: any;
}

export type { MatchProps, MatchDataProps, ResultsProps };
