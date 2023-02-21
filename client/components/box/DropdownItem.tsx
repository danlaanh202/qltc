import { format } from "date-fns";
import styled from "styled-components";
import { IDoctor, IMedicine, IPatient } from "../../types";

const StyledDropdownItemContainer = styled.div`
  padding: 10px;
  border: 1px solid #dbdbdb;
  width: 100%;
  border-radius: 4px;
  min-height: 120px;
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
  data: IPatient | IDoctor | IMedicine;
  type?: "patient" | "doctor" | "medicine";
}) => {
  return (
    <StyledDropdownItemContainer>
      {type === "patient" && (
        <>
          <div className="item">
            <span className="item-label">Họ và tên:</span>{" "}
            {(data as IPatient).ho_ten}
          </div>
          {/* <div className="item">
            <span className="item-label">CCCD:</span>{" "}
            {(data as IPatient).can_cuoc}
          </div> */}
          <div className="item">
            <span className="item-label">Ngày sinh:</span>{" "}
            {format(
              new Date((data as IPatient).ngay_sinh as string),
              "dd/MM/yyyy"
            )}
          </div>
          <div className="item">
            <span className="item-label">Số điện thoại:</span>{" "}
            {(data as IPatient).so_dien_thoai}
          </div>
        </>
      )}
      {type === "doctor" && (
        <>
          <div className="item">
            <span className="item-label">Họ và tên:</span>
            {(data as IDoctor).ten_bac_si}
          </div>
          <div className="item">
            <span className="item-label">Tuổi:</span> {(data as IDoctor).tuoi}
          </div>
          <div className="item">
            <span className="item-label">Chức danh:</span>{" "}
            {(data as IDoctor).chuc_danh}
          </div>
          <div className="item">
            <span className="item-label">Số điện thoại:</span>{" "}
            {(data as IDoctor).so_dien_thoai}
          </div>
        </>
      )}
      {type === "medicine" && (
        <>
          <div className="item">
            <span className="item-label">Tên thuốc:</span>{" "}
            {(data as IMedicine).ten_thuoc}
          </div>
          <div className="item">
            <span className="item-label">Số mũi cần tiêm:</span>{" "}
            {(data as IMedicine).so_mui_can_tiem}
          </div>
          <div className="item">
            <span className="item-label">Số ngày tiêm mũi kế:</span>{" "}
            {(data as IMedicine).so_ngay_tiem_mui_ke_tiep}
          </div>
          <div className="item">
            <span className="item-label">Số lượng:</span>{" "}
            {(data as IMedicine).so_luong}
          </div>
          {/* <div className="item">
            <span className="item-label">Mã số thuốc:</span>{" "}
            {(data as IMedicine).ma_so_thuoc}
          </div> */}
        </>
      )}
    </StyledDropdownItemContainer>
  );
};

export default DropdownItem;
