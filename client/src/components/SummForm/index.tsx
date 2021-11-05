import React from "react";
// import RorLogo from "@/assets/ror-logo.svg";
import RorLogo from "../../assets/ror-logo.svg";

import {
  formContainer,
  submitButt,
  summInput,
  summonerForm,
} from "./SummForm.css";
// import { Image } from 'theme-ui';
import Image from "next/image";

interface Props {
  setSummName: any;
  summQuery: string;
  setSummQuery: any;
  summName: string;
}

const SummForm: React.FC<Props> = (props: Props) => {
  const { setSummName, setSummQuery, summName, summQuery } = props;
  // const summonerFormData = new FormData();

  // const findSummoner = () => {
  //   setSummQuery(summName);
  // };

  const searchForSummoner = async (e: any) => {
    e.preventDefault();

    setSummQuery(summName);

    const res = await fetch(`/api/summoner`, {
      body: JSON.stringify({
        summName: e.target.summName.value,
      }),
      headers: {
        "Content-Type": `application/json`,
      },
      method: `POST`,
    });

    const result = await res.json();
    console.log(result);
  };

  // useEffect(() => {
  //   summQuery !== `` && summonerFormData.set(`summonerName`, summQuery);
  // }, [summQuery]);

  return (
    <div css={formContainer}>
      <Image src={RorLogo} alt="ror-logo" />
      <form css={summonerForm} onSubmit={searchForSummoner}>
        <input
          css={summInput}
          placeholder="Summoner Name"
          value={summName}
          id="summName"
          name="summName"
          type="text"
          autoComplete="summName"
          aria-autocomplete="list"
          required
          onChange={(e: { target: { value: any } }) =>
            setSummName(e.target.value)
          }
        />
        <button css={submitButt} type="submit" disabled={summName === ``}>
          submit
        </button>
      </form>
    </div>
  );
};

export default SummForm;
