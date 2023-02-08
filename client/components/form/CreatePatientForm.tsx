import styled from "styled-components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormRow from "./FormRow";
import FormInput from "./FormInput";
import { useState } from "react";
import useVNAddress from "../../hooks/useVNAddress";
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
  const onSubmitHandler = (data: any) => {
    console.log({
      ...data,
      patient_dob: dob,
      patient_gender: gender,
      district: selectDistrict.name,
      province: selectProvince.name,
      ward: selectWard.name,
    });
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
            id="patient_name"
          />
          <FormInput
            control={control}
            inputType="text"
            label="Số căn cước công dân"
            id="patient_cccd"
            placeholder="Số căn cước công dân"
          />
        </FormRow>
        <FormRow numberOfCol={3}>
          <FormInput
            control={control}
            inputType="text"
            label="Số điện thoại"
            id="patient_phone_number"
          />
          <FormInput
            control={control}
            inputType="date"
            label="Ngày sinh"
            id="patient_dob"
            setStartDate={setDob}
            startDate={dob}
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
          Thêm bệnh nhân
        </button>
      </form>
    </StyledFormContainer>
  );
};

export default CreatePatientForm;
