import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { IDoctor, IMedicine, IPatient } from "../../types";
import DropdownItem from "./DropdownItem";

const StyledInputBox = styled.div`
  width: 100%;
  padding: 12px;
  .box-input {
    padding: 12px;
    width: 100%;
    outline: none;
    margin-top: 20px;
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
}: {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setSelectItem: Dispatch<SetStateAction<any>>;
  dropdownData: IPatient[] | IDoctor[] | IMedicine[];
  nextStep: () => void;
  type?: "patient" | "doctor" | "medicine";
}) => {
  return (
    <StyledInputBox>
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
