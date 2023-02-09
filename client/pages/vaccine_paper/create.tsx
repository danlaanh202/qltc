import Head from "next/head";
import Layout from "../../components/layout/Layout";
import styled from "styled-components";
import MainTop from "../../components/MainTop";

import CreatePaperForm from "../../components/form/CreatePaperForm";
import { Steps } from "antd";
import { useEffect, useState } from "react";
import InputBox from "../../components/box/InputBox";
import { IDoctor, IPatient } from "../../types";
import callApiServices from "../../utils/callApiServices";
import useDebounce from "../../hooks/useDebounce";

const StyledCreateContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  max-width: 935px;
  margin: 60px auto 0;
  .step-container {
    width: 100%;
  }
`;
const create = () => {
  const [current, setCurrent] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryDebounce = useDebounce(searchQuery);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<IPatient>();
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor>();

  const nextStep = () => {
    setCurrent((current) => current + 1);
    setSearchQuery("");
  };

  useEffect(() => {
    if (current === 0 && searchQuery !== "") {
      callApiServices
        .timKiemBenhNhan(searchQueryDebounce)
        .then((response) => setPatients(response.data));
    }
    if (current === 1 && searchQuery !== "") {
      callApiServices
        .timKiemBacSi(searchQueryDebounce)
        .then((response) => setDoctors(response.data));
    }
  }, [current, searchQueryDebounce]);
  return (
    <Layout>
      <Head>
        <title>Thêm phiếu tiêm</title>
      </Head>
      <StyledCreateContainer>
        <MainTop
          title="Thêm phiếu tiêm"
          backTitle="Quản lý phiếu tiêm"
          backRoute="/vaccine_paper"
        />
        <div className="step-container">
          <Steps
            size="small"
            current={current}
            items={[
              {
                title: "Chọn bệnh nhân",
              },
              {
                title: "Chọn bác sĩ",
              },
              {
                title: "Hoàn thành phiếu tiêm",
              },
            ]}
          />
          <div className="step-content-container">
            {current === 0 && (
              <InputBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectItem={setSelectedPatient}
                dropdownData={patients}
                nextStep={nextStep}
                type="patient"
              />
            )}
            {current === 1 && (
              <InputBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectItem={setSelectedDoctor}
                dropdownData={doctors}
                nextStep={nextStep}
                type="doctor"
              />
            )}
            {current === 2 && <CreatePaperForm />}
          </div>
        </div>
      </StyledCreateContainer>
    </Layout>
  );
};

export default create;
