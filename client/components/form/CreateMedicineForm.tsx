import styled from "styled-components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormRow from "./FormRow";
import FormInput from "./FormInput";
import { publicRequest } from "../../utils";
import { useState } from "react";
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
const CreateMedicineForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);
  const [open, msg, severity, handleShow, handleClose] = useSnackbar();
  const onSubmitHandler = async (data: any) => {
    setLoading(true);
    try {
      await callApiServices.createThuocTiem(data).then((res) => {
        setLoading(false);
        handleShow("Đã thêm thuốc tiêm", "success");
      });
    } catch (error) {
      setLoading(false);
      handleShow("Có lỗi xảy ra", "error");
      console.log(error);
    }
  };
  return (
    <>
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
            {loading ? <div className="spinner"></div> : <>Thêm thuốc tiêm</>}
          </button>
        </form>
      </StyledFormContainer>
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
    </>
  );
};

export default CreateMedicineForm;
