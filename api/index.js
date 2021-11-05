import { readFile } from 'fs';
import path from 'path';

import { PlatformId, RiotAPI } from '@fightmegg/riot-api';

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 5000;

const { API_KEY, NODE_ENV } = process.env;

if (NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  req.setTimeout(10000);
  next();
});

const rAPI = new RiotAPI(API_KEY);

let summNameInput;

app.post('/api/summoner', (req, res) => {
  summNameInput = req.body.summName;
  res.status(204).send();
});

const handleGetPuuid = async (summName) => {
  const summPuuid = await rAPI.summoner.getBySummonerName({
    region: PlatformId.NA1,
    summonerName: summName,
  });

  return summPuuid.puuid;
};

const handleGetMatchHistory = async (name) => {
  const acctPuuid = await handleGetPuuid(name);

  return await rAPI.matchV5.getIdsbyPuuid({
    cluster: PlatformId.AMERICAS,
    puuid: `${acctPuuid}`,
    params: {
      start: 0,
      count: 5,
    },
  });
};

const handleBuildData = (matchData) => {
  const {
    info: { gameDuration, gameStartTimestamp, gameId, gameMode, participants },
  } = matchData;

  for (const {
    win,
    perks,
    kills,
    deaths,
    assists,
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    champLevel,
    totalMinionsKilled,
    neutralMinionsKilled,
    neutralMinionsKilledTeamJungle,
    neutralMinionsKilledEnemyJungle,
    championId,
    summoner1Id,
    summoner2Id,
    summonerName,
  } of participants) {
    if (summNameInput === summonerName) {
      return {
        gameId,
        gameMode,
        outcome: win,
        gameDuration,
        gameStartTimestamp,
        summNameInput,
        spell1Id: summoner1Id,
        spell2Id: summoner2Id,
        runes: {
          keystone: perks.styles[0].selections[0].perk,
          primaryRune1: perks.styles[0].selections[1].perk,
          primaryRune2: perks.styles[0].selections[2].perk,
          primaryRune3: perks.styles[0].selections[3].perk,
          secondaryRune1: perks.styles[1].selections[0].perk,
          secondaryRune2: perks.styles[1].selections[1].perk,
        },
        championId,
        kills,
        deaths,
        assists,
        kda: ((kills + assists) / deaths).toFixed(2),
        items: {
          item0,
          item1,
          item2,
          item3,
          item4,
          item5,
          item6,
        },
        championLevel: champLevel,
        creepScore: {
          totalMinionsKilled,
          neutralMinionsKilled,
          neutralMinionsKilledTeamJungle,
          neutralMinionsKilledEnemyJungle,
        },
      };
    }
  }
};

const handleGetMatch = async (matchId) =>
  await rAPI.matchV5.getMatchById({
    cluster: PlatformId.AMERICAS,
    matchId: `${matchId}`,
  });

const searchSummoner = async () => {
  const matchIdList = [];
  const finalResponse = [];

  const riftMatchHistory = await handleGetMatchHistory(summNameInput);

  for (const element of riftMatchHistory) {
    matchIdList.push(element.gameId);
  }

  for (let i = 0; i < 5; i++) {
    // eslint-disable-next-line no-await-in-loop
    await handleGetMatch(riftMatchHistory[i])
      // eslint-disable-next-line promise/always-return
      .then((res) => {
        finalResponse.push(handleBuildData(res));
      });
  }
  return finalResponse;
};

app.get('/api/summoner', async (req, res) => {
  let output;
  if (summNameInput !== undefined) {
    // eslint-disable-next-line promise/always-return
    await searchSummoner().then((summRes) => {
      output = summRes;
    });
    res.json(output);
  }
});

const staticData = {
  champions: {},
  items: {},
  spells: {},
  runes: null,
};

readFile('./static/champion.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }

  const summChampionData = JSON.parse(data);
  const entries = Object.entries(summChampionData.data);
  for (const [champion, values] of entries) {
    staticData.champions[values.key] = champion;
  }
});

// serve item.json
readFile('./static/item.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }

  const summItemData = JSON.parse(data);
  const entries = Object.entries(summItemData.data);
  for (const [item, values] of entries) {
    staticData.items[item] = values.name;
  }
});

// serve summoner spells
let summSpellData;

readFile('./static/summoner.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }

  summSpellData = JSON.parse(data);
  const entries = Object.entries(summSpellData.data);
  for (const [values] of entries) {
    staticData.spells[values.key] = values.id;
  }
});

readFile('./static/runesReforged.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }

  const summKeystoneData = JSON.parse(data);
  const keystoneEntries = Object.entries(summKeystoneData);
  staticData.runes = keystoneEntries.map((x) => x[1]);
});

app.get('/static', async (req, res) => {
  await res.json(staticData);
});

app.use('/static', express.static(path.join(__dirname, 'static')));

if (NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`));
  });
}

// catchall
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/public/index.html`));
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

export default app;
