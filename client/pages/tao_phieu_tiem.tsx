import { Steps } from "antd";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import InputBox from "../components/box/InputBox";
import CreatePaperForm from "../components/form/CreatePaperForm";
import CreatePatientFormGuest from "../components/form/CreatePatientFormGuest";
import useDebounce from "../hooks/useDebounce";
import { IDoctor, IMedicine, IPatient } from "../types";
import callApiServices from "../utils/callApiServices";

const StyledTaoPhieu = styled.div`
  max-width: 930px;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  .new-popup {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .popup-container {
      width: 400px;
      height: 400px;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .title {
        font-size: 20px;
        margin: 12px 0;
        margin-bottom: 32px;
        font-weight: 600;
      }
      .option-container {
        margin: 12px 0;
        display: flex;
        align-items: center;

        .option {
          cursor: pointer;
          font-size: 16px;
          margin: 0 16px;
          border: 1px solid #ccc;
          padding: 8px;
          border-radius: 8px;
          :hover {
            background: #f2f0f0;
          }
        }
      }
    }
  }
  .new-title {
    margin: 20px 0;
    font-weight: 600;
    font-size: 20px;
  }
  .step-container {
    margin: 40px;
  }
`;
const tao_phieu_tiem = () => {
  const [newPatient, setNewPatient] = useState<"Cu" | "Moi" | "Chua">("Chua");
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
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const nextStep = () => {
    setCurrent((current) => current + 1);
    setSearchQuery("");
  };
  const onSubmitH = (data: any) => {
    setCurrent(1);
    setSelectedPatient(data);
    setNewPatient("Cu");
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
    <StyledTaoPhieu>
      <Head>
        <title>Tạo phiếu tiêm</title>
      </Head>
      {newPatient === "Chua" && (
        <>
          <div className="new-popup">
            <div className="popup-container">
              <div className="title">Bạn là khách hàng mới?</div>
              <div className="option-container">
                <div onClick={() => setNewPatient("Cu")} className="option">
                  Khách hàng cũ
                </div>
                <div onClick={() => setNewPatient("Moi")} className="option">
                  Khách hàng mới
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {newPatient === "Cu" && (
        <>
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
        </>
      )}
      {newPatient === "Moi" && (
        <>
          <div className="new-title">Điền thông tin cá nhân</div>
          <CreatePatientFormGuest onSubmitH={onSubmitH} />
        </>
      )}
    </StyledTaoPhieu>
  );
};

export default tao_phieu_tiem;
