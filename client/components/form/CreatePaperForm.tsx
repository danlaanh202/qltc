import styled from "styled-components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormRow from "./FormRow";
import FormInput from "./FormInput";
import { useState } from "react";
import FilterListBox from "../box/FilterListBox";
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
const CreateMedicineForm = ({
  createPaper,
  loading = false,
}: {
  createPaper: (data: any) => void;
  loading?: boolean;
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [open, msg, severity, handleShow, handleClose] = useSnackbar();

  const [vaccinatedDate, setVaccinatedDate] = useState();
  const onSubmitHandler = async (data: any) => {
    await createPaper({ ...data, ngay_da_tiem: vaccinatedDate }).then((res) => {
      console.log(res);
      if (res?.id_phieu_tiem) {
        handleShow("Đã hoàn thành phiếu tiêm", "success");
      } else {
        handleShow("Có lỗi xảy ra", "error");
      }
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
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <>Hoàn thành phiếu tiêm</>
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

export default CreateMedicineForm;
