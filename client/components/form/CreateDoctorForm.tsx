import styled from "styled-components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormRow from "./FormRow";
import FormInput from "./FormInput";
import { useState } from "react";
import useVNAddress from "../../hooks/useVNAddress";
import callApiServices from "../../utils/callApiServices";
import { getAge } from "../../utils";
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
const CreateDoctorForm = () => {
  const {
    handleSubmit,
    control,
    reset,
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
  const [open, msg, severity, handleShow, handleClose] = useSnackbar();
  const [loading, setLoading] = useState(false);
  const onSubmitHandler = async (data: any) => {
    setLoading(true);
    try {
      await callApiServices
        .taoBacSi({
          ten_bac_si: data.ten_bac_si,
          tuoi: getAge(dob),
          so_dien_thoai: data.so_dien_thoai,
          chuc_danh: data.chuc_danh,
          gioi_tinh: gender,
          dia_chi: `${selectWard.name} - ${selectDistrict.name} - ${selectDistrict.name}`,
        })
        .then((response) => {
          setLoading(false);
          reset();
          handleShow("Th??m b??c s?? th??nh c??ng", "success");
        });
    } catch (error) {
      setLoading(false);
      handleShow("C?? l???i x???y ra", "error");
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
            label="H??? v?? t??n"
            id="ten_bac_si"
          />
          <FormInput
            control={control}
            inputType="date"
            label="Ng??y sinh"
            id="patient_dob"
            setStartDate={setDob}
            startDate={dob}
          />
        </FormRow>
        <FormRow numberOfCol={2}>
          <FormInput
            control={control}
            inputType="text"
            label="Ch???c danh"
            id="chuc_danh"
          />
          <FormInput
            control={control}
            inputType="text"
            label="S??? ??i???n tho???i"
            id="so_dien_thoai"
          />
        </FormRow>
        <FormRow numberOfCol={2}>
          <FormInput
            control={control}
            inputType="radio"
            label="Gi???i T??nh"
            id="patient_gender"
            radioIds={["Nam", "N???"]}
            radioLabels={["Nam", "N???"]}
            setOuterVal={setGender}
          />
        </FormRow>
        <FormRow numberOfCol={3}>
          <FormInput
            control={control}
            id="province"
            inputType="dropdown"
            label="T???nh th??nh"
            list={provincesList}
            setOuterVal={setSelectProvince}
          />
          <FormInput
            control={control}
            id="district"
            inputType="dropdown"
            label="Qu???n huy???n"
            list={districtsList}
            setOuterVal={setSelectDistrict}
          />
          <FormInput
            control={control}
            id="ward"
            inputType="dropdown"
            label="Ph?????ng x??"
            list={wardsList}
            setOuterVal={setSelectWard}
          />
        </FormRow>
        <button type="submit" className="submit-btn">
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <>Ho??n th??nh phi???u ti??m</>
          )}
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

export default CreateDoctorForm;
