import styled from "styled-components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormRow from "./FormRow";
import FormInput from "./FormInput";
import { useState } from "react";
import useVNAddress from "../../hooks/useVNAddress";
import callApiServices from "../../utils/callApiServices";
import useSnackbar from "../../hooks/useSnackbar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const schema = yup.object({});
const StyledFormContainer = styled.div`
  .submit-btn {
    margin-top: 40px;
    background: #1f28af;
    color: white;
    padding: 12px 20px;
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    min-width: 150px;
    min-height: 42px;
    cursor: pointer;
    .spinner {
      width: 14px;
      height: 14px;
      border: 2px solid white;
      border-left: 2px solid transparent;
      margin: auto;
      border-radius: 100%;
    }
  }
`;
const CreatePatientForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [
    provincesList,
    setProvincesList,
    selectProvince,
    setSelectProvince,
    districtsList,
    setDistrictsList,
    selectDistrict,
    setSelectDistrict,
    wardsList,
    setWardsList,
    selectWard,
    setSelectWard,
  ] = useVNAddress();
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState();
  const [loading, setLoading] = useState(false);
  const [open, msg, severity, handleShow, handleClose] = useSnackbar();
  const onSubmitHandler = async (data: any) => {
    setLoading(true);

    try {
      await callApiServices
        .taoBenhNhan({
          ho_ten: data.ho_ten,
          can_cuoc: data.can_cuoc,
          ngay_sinh: dob,
          so_dien_thoai: data.so_dien_thoai,
          gioi_tinh: gender,
          email: data.email,
          dia_chi: `${selectWard.name} - ${selectDistrict.name} - ${selectDistrict.name}`,
        })
        .then((response) => {
          console.log(response.data);
          setLoading(false);
          handleShow("Thêm bệnh nhân thành công", "success");
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      handleShow("Có lỗi xảy ra", "error");
    }
  };
  return (
    <StyledFormContainer>
      <form
        onSubmit={handleSubmit(onSubmitHandler as SubmitHandler<FieldValues>)}
      >
        <FormRow numberOfCol={2}>
          <FormInput
            control={control}
            inputType="text"
            label="Họ và tên"
            id="ho_ten"
          />
          <FormInput
            control={control}
            inputType="text"
            label="Số căn cước công dân"
            id="can_cuoc"
            placeholder="Số căn cước công dân"
          />
        </FormRow>
        <FormRow numberOfCol={2}>
          <FormInput
            control={control}
            inputType="text"
            label="Số điện thoại"
            id="so_dien_thoai"
          />
          <FormInput
            control={control}
            inputType="date"
            label="Ngày sinh"
            id="patient_dob"
            setStartDate={setDob}
            startDate={dob}
          />
        </FormRow>
        <FormRow numberOfCol={2}>
          <FormInput
            control={control}
            inputType="text"
            label="Email"
            id="email"
          />

          <FormInput
            control={control}
            inputType="radio"
            label="Giới Tính"
            id="patient_gender"
            radioIds={["Nam", "Nữ"]}
            radioLabels={["Nam", "Nữ"]}
            setOuterVal={setGender}
          />
        </FormRow>
        <FormRow numberOfCol={3}>
          <FormInput
            control={control}
            id="province"
            inputType="dropdown"
            label="Tỉnh thành"
            list={provincesList}
            setOuterVal={setSelectProvince}
          />
          <FormInput
            control={control}
            id="district"
            inputType="dropdown"
            label="Quận huyện"
            list={districtsList}
            setOuterVal={setSelectDistrict}
          />
          <FormInput
            control={control}
            id="ward"
            inputType="dropdown"
            label="Phường xã"
            list={wardsList}
            setOuterVal={setSelectWard}
          />
        </FormRow>
        <button type="submit" className="submit-btn">
          {loading ? <div className="spinner"></div> : <>Thêm bệnh nhân</>}
        </button>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </StyledFormContainer>
  );
};

export default CreatePatientForm;
