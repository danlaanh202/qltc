import styled from "styled-components";
import ChoosenBox from "../components/box/ChoosenBox";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";

const StyledPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  flex-direction: column;
  gap: 40px;
  .title-container {
    font-size: 30px;
    line-height: 44px;
  }
  .button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 100px;
  }
`;
const index = () => {
  return (
    <StyledPageContainer>
      <h2 className="title-container">Trung tâm tiêm chủng DĐHHD</h2>
      <div className="button-container">
        <ChoosenBox
          title="Trung tâm"
          icon={
            <>
              <LocalHospitalIcon style={{ width: "60px", height: "60px" }} />
            </>
          }
          href="/dashboard"
        ></ChoosenBox>
        <ChoosenBox
          title="Tạo phiếu tiêm"
          icon={
            <>
              <AccessibilityNewIcon style={{ width: "60px", height: "60px" }} />
            </>
          }
          href="/tao_phieu_tiem"
        ></ChoosenBox>
      </div>
    </StyledPageContainer>
  );
};

export default index;
