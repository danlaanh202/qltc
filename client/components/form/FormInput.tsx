import styled from "styled-components";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Dispatch, SetStateAction, useState } from "react";
import ReactDatePicker from "react-datepicker";
import ComboBox from "./ComboBox";
import { Control, FieldValues, useController } from "react-hook-form";
interface IFormProps {
  label: string;
  id: string;
  placeholder?: string;
  inputType?: "text" | "date" | "dropdown" | "radio";
  radioLabels?: string[];
  radioIds?: string[];
  provincesList?: string[];
  list?: any[];
  setOuterVal?: Dispatch<SetStateAction<any>>;
  control?: Control<FieldValues, any>;
  setStartDate?: Dispatch<SetStateAction<any>>;
  startDate?: any;
}
interface IStyledContainerProps {
  inputType: "text" | "date" | "dropdown" | "radio";
}

const StyledFormInputContainer = styled.div<IStyledContainerProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 24px;
  .reg-label {
    padding-bottom: 10px;
    margin-bottom: 4px;
    line-height: 1.1;
    font-weight: 700;
    ::before {
      content: "*";
      color: #e5285d;
      margin-right: 4px;
    }
  }
  .input-container {
    width: 100%;
    position: relative;
    .reg-input {
      padding: 0 ${(props) => (props.inputType === "text" ? "16px" : "30px")};
      height: 40px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      width: 100%;
      ::placeholder {
        color: #d2c9cc;
      }
    }
    .date-picker-container {
      .date-picker {
        height: 40px;
        border-radius: 4px;
        width: 100%;
        .react-datepicker__input-container {
          height: 100%;
          input {
            width: 100% !important;
            height: 100%;
            border: 1px solid #dcdfe6;
            padding: 0 30px;
            ::placeholder {
              color: #d2c9cc;
            }
          }
        }
      }
      .placeholder-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 6px;
        color: #d2c9cc;
      }
    }
    .radio-container {
      display: flex;
      border: 1px solid #dcdfe6;
      width: 100%;
      height: 40px;
      border-radius: 4px;
      overflow: hidden;
      .radio-input {
        display: none;
      }
      .radio-label {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .radio-input:checked + .radio-label {
        background: #1f28af !important;
        color: white;
      }
    }

    .MuiAutocomplete-root {
      height: 100%;
      width: 100%;
    }
  }
  .reg-error {
    position: absolute;
    top: 100%;
    padding-top: 4px;
    left: 0;
    color: #e5285d;
    font-size: 12px;
    line-height: 1.1;
  }
`;

const FormInput = (props: IFormProps) => {
  // const [startDate, setStartDate] = useState<string | Date>();
  const { field } = useController({
    control: props?.control,
    name: props.id,
    defaultValue: "",
  });
  return (
    <StyledFormInputContainer
      inputType={props.inputType || "text"}
      className="reg-input-container"
    >
      <label htmlFor={props.id} className="reg-label">
        {props.label}
      </label>
      <div className="input-container">
        {props.inputType === "text" && (
          <input
            className="reg-input"
            type="text"
            id={props.id}
            placeholder={props.placeholder || ""}
            {...field}
          />
        )}
        {props.inputType === "date" && (
          <div className="date-picker-container">
            <ReactDatePicker
              wrapperClassName="date-picker"
              dateFormat="dd/MM/yyyy"
              placeholderText="Ngày/Tháng/Năm"
              selected={props.startDate}
              onChange={(date: Date) => props.setStartDate(date)}
            />
            <div className="placeholder-icon">
              <CalendarMonthIcon />
            </div>
          </div>
        )}
        {props.inputType === "radio" && (
          <div className="radio-container">
            <input
              className="radio-input"
              type="radio"
              name={props.id}
              id={props.radioIds[0]}
              value={props.radioLabels[0]}
              onChange={(e) => props.setOuterVal(e.target.value)}
            />
            <label
              style={{ borderRight: "1px solid #dcdfe6" }}
              className="radio-label"
              htmlFor={props.radioIds[0]}
            >
              {props.radioLabels[0]}
            </label>
            <input
              className="radio-input"
              type="radio"
              name={props.id}
              id={props.radioIds[1]}
              value={props.radioLabels[1]}
              onChange={(e) => props.setOuterVal(e.target.value)}
            />
            <label className="radio-label" htmlFor={props.radioIds[1]}>
              {props.radioLabels[1]}
            </label>
          </div>
        )}
        {props.inputType === "dropdown" && (
          <ComboBox itemList={props.list} setOuterVal={props.setOuterVal} />
        )}
      </div>
      {/* <span className="reg-error">Vui lòng chọn/điền</span> */}
    </StyledFormInputContainer>
  );
};

export default FormInput;
