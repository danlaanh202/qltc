import styled from "styled-components";
import { IDoctor, IPatient } from "../../types";

const StyledDropdownItemContainer = styled.div`
  padding: 10px;
  border: 1px solid #dbdbdb;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    background: #fafafa;
  }
  .item {
    font-size: 16px;
    margin-bottom: 4px;
    &-label {
      font-weight: 600;
    }
  }
`;
const DropdownItem = ({
  data,
  type,
}: {
  data: IPatient | IDoctor;
  type?: "patient" | "doctor";
}) => {
  return (
    <StyledDropdownItemContainer>
      {type === "patient" ? (
        <>
          <div className="item">
            <span className="item-label">Họ và tên:</span>{" "}
            {(data as IPatient).ho_ten}
          </div>
          <div className="item">
            <span className="item-label">CCCD:</span>{" "}
            {(data as IPatient).can_cuoc}
          </div>
          <div className="item">
            <span className="item-label">Ngày sinh:</span>{" "}
            {(data as IPatient).ngay_sinh}
          </div>
          <div className="item">
            <span className="item-label">Số điện thoại:</span>{" "}
            {(data as IPatient).so_dien_thoai}
          </div>
        </>
      ) : (
        <>
          <div className="item">
            <span className="item-label">Họ và tên:</span> Trần chí thanh
          </div>
          <div className="item">
            <span className="item-label">Tuổi:</span> 20
          </div>
          <div className="item">
            <span className="item-label">Chức danh:</span> Bác sĩ chính
          </div>
          <div className="item">
            <span className="item-label">Số điện thoại:</span> 0974498918
          </div>
        </>
      )}
    </StyledDropdownItemContainer>
  );
};

export default DropdownItem;
