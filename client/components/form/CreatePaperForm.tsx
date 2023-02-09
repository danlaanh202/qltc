import styled from "styled-components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormRow from "./FormRow";
import FormInput from "./FormInput";
import { useState } from "react";
import FilterListBox from "../box/FilterListBox";
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
const CreateMedicineForm = ({
  createPaper,
}: {
  createPaper: (data: any) => void;
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [vaccinatedDate, setVaccinatedDate] = useState();
  const onSubmitHandler = (data: any) => {
    createPaper({ ...data, ngay_da_tiem: vaccinatedDate });
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
            label="Số mũi đã tiêm"
            id="medicine_amount"
          />
          <FormInput
            control={control}
            inputType="date"
            label="Ngày cuối đã tiêm"
            id="ngay_da_tiem"
            setStartDate={setVaccinatedDate}
            startDate={vaccinatedDate}
          />
        </FormRow>
        <FilterListBox />
        <button type="submit" className="submit-btn">
          Hoàn thành phiếu tiêm
        </button>
      </form>
    </StyledFormContainer>
  );
};

export default CreateMedicineForm;
