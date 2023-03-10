import Head from "next/head";
import Layout from "../../components/layout/Layout";
import styled from "styled-components";
import MainTop from "../../components/MainTop";

import CreatePaperForm from "../../components/form/CreatePaperForm";
import { Steps } from "antd";
import { useEffect, useState } from "react";
import InputBox from "../../components/box/InputBox";
import { IDoctor, IMedicine, IPatient } from "../../types";
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
  .paper-info-container {
    margin-top: 20px;
    .item {
      font-size: 16px;
      margin-top: 8px;
      label {
        font-weight: 600;
      }
      .item-content {
      }
    }
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
  const [medicines, setMedicines] = useState<IMedicine[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<IMedicine>();
  const [loading, setLoading] = useState(false);
  const nextStep = () => {
    setCurrent((current) => current + 1);
    setSearchQuery("");
  };
  const handleCreatePaper = async (data: any) => {
    setLoading(true);
    try {
      return await callApiServices
        .taoPhieuTiem({
          id_benh_nhan: selectedPatient?.id_benh_nhan,
          ma_dinh_danh: selectedDoctor?.ma_dinh_danh,
          ma_so_thuoc: selectedMedicine?.ma_so_thuoc,
          so_mui_da_tiem: parseInt(data.so_mui_da_tiem),
          ngay_da_tiem: data.ngay_da_tiem,
          ngay_tiem: Date.now(),
          so_ngay_tiem_mui_ke_tiep: selectedMedicine?.so_ngay_tiem_mui_ke_tiep,
        })
        .then((res) => {
          setLoading(false);
          return res;
        });
    } catch (error) {
      setLoading(false);
      return error;
    }
  };
  useEffect(() => {
    if (searchQuery !== "") {
      setLoading(true);
    }
    if (current === 0) {
      callApiServices
        .timKiemBenhNhan(searchQueryDebounce)
        .then((response) => {
          setLoading(false);
          setPatients(response.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    if (current === 1) {
      callApiServices
        .timKiemBacSi(searchQueryDebounce)
        .then((response) => {
          setDoctors(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    if (current === 2) {
      callApiServices
        .timKiemThuocTiem(searchQueryDebounce)
        .then((response) => {
          setMedicines(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [current, searchQueryDebounce]);
  return (
    <Layout>
      <Head>
        <title>Th??m phi???u ti??m</title>
      </Head>
      <StyledCreateContainer>
        <MainTop
          title="Th??m phi???u ti??m"
          backTitle="Qu???n l?? phi???u ti??m"
          backRoute="/vaccine_paper"
        />
        <div className="step-container">
          <Steps
            size="small"
            current={current}
            items={[
              {
                title: "Ch???n b???nh nh??n",
              },
              {
                title: "Ch???n b??c s??",
              },
              {
                title: "Ch???n Thu???c",
              },
              {
                title: "Ho??n th??nh phi???u ti??m",
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
                loading={loading}
                setLoading={setLoading}
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
                loading={loading}
                setLoading={setLoading}
              />
            )}
            {current === 2 && (
              <InputBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectItem={setSelectedMedicine}
                dropdownData={medicines}
                nextStep={nextStep}
                type="medicine"
                loading={loading}
                setLoading={setLoading}
              />
            )}
            {current === 3 && (
              <>
                <div className="paper-info-container">
                  <div className="item">
                    <label htmlFor="">T??n b???nh nh??n:</label>{" "}
                    <span className="item-content">
                      {selectedPatient?.ho_ten}
                    </span>
                  </div>
                  <div className="item">
                    <label htmlFor="">T??n b??c s??:</label>{" "}
                    <span className="item-content">
                      {selectedDoctor?.ten_bac_si}
                    </span>
                  </div>
                  <div className="item">
                    <label htmlFor="">T??n thu???c:</label>{" "}
                    <span className="item-content">
                      {selectedMedicine?.ten_thuoc}
                    </span>
                  </div>
                  <div className="item">
                    <label htmlFor="">S??? ng??y ti??m m??i k??? ti???p:</label>{" "}
                    <span className="item-content">
                      {selectedMedicine?.so_ngay_tiem_mui_ke_tiep}
                    </span>
                  </div>
                  <div className="item">
                    <label htmlFor="">S??? m??i c???n thi???t:</label>{" "}
                    <span className="item-content">
                      {selectedMedicine?.so_mui_can_tiem}
                    </span>
                  </div>
                </div>
                <CreatePaperForm
                  loading={loading}
                  createPaper={handleCreatePaper}
                  selectedMedicine={selectedMedicine}
                />
              </>
            )}
          </div>
        </div>
      </StyledCreateContainer>
    </Layout>
  );
};

export default create;
