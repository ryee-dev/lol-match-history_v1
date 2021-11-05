const getChampionName = async (champKey: any, staticData: any) => {
  // console.log(champKey);
  console.log(staticData);
  for (let i = 0; i < staticData.champions.championKeys.length; i++) {
    if (champKey.toString() === staticData.champions.championKeys[i]) {
      await staticData.champions.championNames[i]
        .then((res) => {
          return res;
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((e) => {
          console.log(e.code);
        });
    }
  }
};

const getItemName = async (itemKey: number, staticData: any) => {
  for (let i = 0; i < staticData.itemKeys.length; i++) {
    if (itemKey.toString() === staticData.itemKeys[i]) {
      await staticData.itemNames[i]
        .then((res) => {
          return res;
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((e) => {
          console.log(e.code);
        });
    }
  }
};

const getSpellName = async (spellKey: number, staticData: any) => {
  for (let i = 0; i < staticData.spells.spellKeys.length; i++) {
    if (spellKey.toString() === staticData.spells.spellKeys[i]) {
      await staticData.spells.spellNames[i]
        .then((res) => {
          return res;
        }) // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((e) => {
          console.log(e.code);
        });
    }
  }
};

const getSpellId = async (spellKey: number, staticData: any) => {
  for (let i = 0; i < staticData.spells.spellKeys.length; i++) {
    if (spellKey.toString() === staticData.spells.spellKeys[i]) {
      await staticData.spells.spellIds[i]
        .then((res) => {
          return res;
        }) // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((e) => {
          console.log(e.code);
        });
    }
  }
};

const getRuneName = async (runeId: number, staticData: any) => {
  for (let i = 0; i < staticData.runeIds.length; i++) {
    if (runeId === staticData.runeIds[i]) {
      await staticData.runeNames[i]
        .then((res) => {
          return res;
        }) // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((e) => {
          console.log(e.code);
        });
    }
  }
};

const handleConvertSecToMin = (milliseconds: number) => {
  const minutes = Math.floor(milliseconds / 60);
  const seconds = (milliseconds % 60).toFixed(0);

  return `${minutes}m ${seconds}s`;
};

export {
  getChampionName,
  getItemName,
  getRuneName,
  getSpellName,
  getSpellId,
  handleConvertSecToMin,
};
