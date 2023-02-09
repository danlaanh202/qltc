import styled from "styled-components";
import { IMedicine } from "../../types";

const StyledMedicineContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    border-color: #072d94;
  }
  .medicine-information-container {
    flex: 1;
    .medicine-title {
      color: #2a388f;
      font-size: 16px;
      font-weight: 600;
      margin: 12px 0;
    }
    .medicine-description {
      color: #6d6e70;
    }
  }
`;
const MedicineSearchItem = ({ data }: { data: IMedicine }) => {
  return (
    <StyledMedicineContainer>
      <div className="medicine-information-container">
        <div className="card-item">
          <label htmlFor="">Tên thuốc: </label>
          <span>{data.ten_thuoc}</span>
        </div>
        <div className="card-item">
          <label htmlFor="">Đơn giá: </label>
          <span>{data.so_mui_can_tiem}</span>
        </div>

        <div className="card-item">
          <label htmlFor="">Số mũi cần tiêm: </label>
          <span>{data.so_mui_can_tiem}</span>
        </div>
        <div className="card-item">
          <label htmlFor="">Mũi tiêm kế tiếp: </label>
          <span>{data.so_ngay_tiem_mui_ke_tiep} ngày</span>
        </div>
        <div className="card-item">
          <label htmlFor="">Số lượng: </label>
          <span>{data.so_luong}</span>
        </div>
      </div>
    </StyledMedicineContainer>
  );
};

export default MedicineSearchItem;
