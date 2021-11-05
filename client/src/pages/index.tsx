import React, { useEffect, useRef, useState } from "react";
import ky from "ky";
import useOnClickOutside from "use-onclickoutside";
import { Container } from "theme-ui";
import Error from "next/error";
import { Loading, SummForm, SummResults } from "../components";
import CloseIcon from "../assets/close.svg";
import { GetServerSideProps, NextPage } from "next";
import { appOverlay, appShell, modalWrapper } from "@/index.css";

const SummonersRift: NextPage<{ data: any }> = (props) => {
  const { data } = props;
  if (!data) {
    console.log(`no data`);
  }

  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [summData, setSummData] = useState(null);
  const [summName, setSummName] = useState(``);
  const [summQuery, setSummQuery] = useState(``);
  const [staticData, setStaticData] = useState(null);

  // const staticData = useFetch(`/static`, { method: `GET` });

  const closeModal = () => {
    setModalStatus(false);
    setSummData(null);
    setSummQuery(``);
    setSummName(``);
  };

  const ref = useRef(null);
  useOnClickOutside(ref, closeModal);

  const handleEscClose = (e: { keyCode: number }) => {
    if (e.keyCode === 27) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleToggle = () => {
      // @ts-ignore
      if (summData?.length !== 0) {
        setError(false);
        setLoading(false);
        setModalStatus(true);
        console.log(summQuery, `fetched`);
      }
    };

    if (summQuery !== `` && summData) {
      // console.log(summData);
      handleToggle();
    }
  }, [summData, summQuery]);

  useEffect(() => {
    const fetchData = async () => {
      setModalStatus(false);
      setLoading(true);

      if (summQuery !== ``) {
        setLoading(true);
        console.log(`fetching`);

        await ky
          .get(`/api/summoner`)
          .json()
          .then((res) => {
            // @ts-ignore
            setSummData(res);
          });
      }
    };

    if (summQuery !== ``) {
      fetchData();
    }
  }, [summQuery]);

  useEffect(() => {
    data && setStaticData(data);
  }, [data]);

  return (
    <Container css={appShell} onKeyDown={handleEscClose}>
      <SummForm
        setSummName={setSummName}
        setSummQuery={setSummQuery}
        summName={summName}
        summQuery={summQuery}
      />
      {summQuery !== `` && loading && <Loading />}
      {!loading && modalStatus && error && <Error statusCode={404} />}
      {modalStatus && !loading && summData && (
        <div css={modalWrapper} ref={ref}>
          <SummResults
            data={summData}
            summQuery={summQuery}
            staticData={staticData}
          />
        </div>
      )}
      {summQuery !== `` && <div css={appOverlay} />}
      {modalStatus && !loading && (
        <img src={CloseIcon} alt="close-icon" onClick={closeModal} />
      )}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const result = await fetch(`/static`);
    const data: any = await result.json();

    return {
      props: { data },
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {},
    };
  }
};

export default SummonersRift;
