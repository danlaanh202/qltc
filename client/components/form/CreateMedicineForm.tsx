import styled from "styled-components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormRow from "./FormRow";
import FormInput from "./FormInput";
import { publicRequest } from "../../utils";
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
  const onSubmitHandler = async (data: any) => {
    try {
      await publicRequest
        .post("/thuoc_tiem/tao_thuoc_tiem", {
          ten_thuoc: data.medicine_name,
          so_luong: parseInt(data.medicine_amount),
          so_mui_can_tiem: parseInt(data.so_mui),
          so_ngay_tiem_mui_ke_tiep: parseInt(data.medicine_next),
          don_gia: parseInt(data.medicine_price),
        })
        .then((res) => console.log(res.data));
    } catch (error) {
      console.log(error);
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
            label="Tên thuốc tiêm"
            id="medicine_name"
          />
          <FormInput
            control={control}
            inputType="text"
            label="Ngày tiêm tiếp theo (ngày)"
            id="medicine_next"
            placeholder="Số ngày để tiêm mũi tiếp theo (Ví dụ: 30)"
          />
        </FormRow>
        <FormRow numberOfCol={2}>
          <FormInput
            control={control}
            inputType="text"
            label="số lượng"
            id="medicine_amount"
          />

          <FormInput
            control={control}
            inputType="text"
            label="Đơn giá (VNĐ)"
            id="medicine_price"
          />
        </FormRow>
        <FormRow numberOfCol={2}>
          <FormInput
            control={control}
            inputType="text"
            label="Số mũi cần thiết"
            id="so_mui"
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
