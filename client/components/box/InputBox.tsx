import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { IDoctor, IMedicine, IPatient } from "../../types";
import DropdownItem from "./DropdownItem";

const StyledInputBox = styled.div`
  width: 100%;
  padding: 12px;
  .input-container {
    width: 100%;
    position: relative;
    .box-input {
      padding: 12px;
      width: 100%;
      outline: none;
      margin-top: 20px;
    }
    .spinner {
      position: absolute;
      width: 20px;
      height: 20px;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      border: 2px dotted black;
      border-right: 2px dotted transparent;
      border-radius: 100%;
    }
  }
  .dropdown-container {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
  }
`;
const InputBox = ({
  searchQuery,
  setSearchQuery,
  setSelectItem,
  dropdownData,
  nextStep,
  type = "patient",
  loading = false,
}: {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setSelectItem: Dispatch<SetStateAction<any>>;
  dropdownData: IPatient[] | IDoctor[] | IMedicine[];
  nextStep: () => void;
  type?: "patient" | "doctor" | "medicine";
  loading?: boolean;
}) => {
  return (
    <StyledInputBox>
      <div className="input-container">
        <input
          type="text"
          className="box-input"
          placeholder={
            type === "patient"
              ? "Nhập vào tên bệnh nhân"
              : type === "doctor"
              ? "Nhập vào tên bác sĩ"
              : "Nhập vào tên thuốc"
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {loading && <div className="spinner"></div>}
      </div>
      <div className="dropdown-container">
        {dropdownData.map((item) => (
          <div
            onClick={() => {
              setSelectItem(item);
              nextStep();
            }}
          >
            <DropdownItem data={item} type={type} />
          </div>
        ))}
      </div>
    </StyledInputBox>
  );
};

export default InputBox;
