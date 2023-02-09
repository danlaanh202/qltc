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

  const nextStep = () => {
    setCurrent((current) => current + 1);
    setSearchQuery("");
  };
  const handleCreatePaper = async (data: any) => {
    try {
      await callApiServices
        .taoPhieuTiem({
          id_benh_nhan: selectedPatient?.id_benh_nhan,
          ma_dinh_danh: selectedDoctor?.ma_dinh_danh,
          ma_so_thuoc: selectedMedicine?.ma_so_thuoc,
          so_mui_da_tiem: parseInt(data.medicine_amount),
          ngay_da_tiem: data.ngay_da_tiem,
          ngay_tiem: Date.now(),
          so_ngay_tiem_mui_ke_tiep: selectedMedicine?.so_ngay_tiem_mui_ke_tiep,
        })
        .then((res) => console.log(res.data));
    } catch (error) {
      console.log(error);
    }
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
    if (current === 2 && searchQuery !== "") {
      callApiServices
        .timKiemThuocTiem(searchQueryDebounce)
        .then((response) => setMedicines(response.data));
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
                title: "Chọn Thuốc",
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
            {current === 2 && (
              <InputBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectItem={setSelectedMedicine}
                dropdownData={medicines}
                nextStep={nextStep}
                type="medicine"
              />
            )}
            {current === 3 && (
              <>
                <div className="paper-info-container">
                  <div className="item">
                    <label htmlFor="">Tên bệnh nhân:</label>{" "}
                    <span className="item-content">
                      {selectedPatient?.ho_ten}
                    </span>
                  </div>
                  <div className="item">
                    <label htmlFor="">Tên bác sĩ:</label>{" "}
                    <span className="item-content">
                      {selectedDoctor?.ten_bac_si}
                    </span>
                  </div>
                  <div className="item">
                    <label htmlFor="">Tên thuốc:</label>{" "}
                    <span className="item-content">
                      {selectedMedicine?.ten_thuoc}
                    </span>
                  </div>
                  <div className="item">
                    <label htmlFor="">Số ngày tiêm mũi kế tiếp:</label>{" "}
                    <span className="item-content">
                      {selectedMedicine?.so_ngay_tiem_mui_ke_tiep}
                    </span>
                  </div>
                </div>
                <CreatePaperForm createPaper={handleCreatePaper} />
              </>
            )}
          </div>
        </div>
      </StyledCreateContainer>
    </Layout>
  );
};

export default create;
