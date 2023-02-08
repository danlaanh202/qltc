import styled from "styled-components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormRow from "./FormRow";
import FormInput from "./FormInput";
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
const CreateMedicineForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmitHandler = (data: any) => {
    console.log(data);
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
            label="ID bệnh nhân"
            id="patient_cccd"
          />
          <FormInput
            control={control}
            inputType="text"
            label="Mã định danh(bác sĩ)"
            id="doctor_id"
            placeholder=""
          />
        </FormRow>
        <FormRow numberOfCol={2}>
          <FormInput
            control={control}
            inputType="text"
            label="Mã số thuốc"
            id="medicine_id"
          />

          <FormInput
            control={control}
            inputType="text"
            label="Số mũi đã tiêm"
            id="medicine_amount"
          />
        </FormRow>
        <button type="submit" className="submit-btn">
          Thêm thuốc tiêm
        </button>
      </form>
    </StyledFormContainer>
  );
};

export default CreateMedicineForm;
