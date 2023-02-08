import Head from "next/head";
import styled from "styled-components";
import ChoosenBox from "../../components/box/ChoosenBox";
import HistoryIcon from "@mui/icons-material/History";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VaccinesIcon from "@mui/icons-material/Vaccines";
const StyledGuestContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  gap: 40px;
`;
const index = () => {
  return (
    <StyledGuestContainer>
      <Head>
        <title>Trang Chủ Khách Hàng</title>
      </Head>
      <ChoosenBox
        title="Đăng kí tiêm chủng"
        href="/guest/vaccine_register"
        icon={
          <>
            <CalendarMonthIcon style={{ width: "60px", height: "60px" }} />
          </>
        }
      />
      <ChoosenBox
        title="Danh sách thuốc"
        href="/guest/vaccines_list"
        icon={
          <>
            <VaccinesIcon style={{ width: "60px", height: "60px" }} />
          </>
        }
      />
      <ChoosenBox
        title="Tra cứu lịch sử tiêm"
        href="/guest/history"
        icon={
          <>
            <HistoryIcon style={{ width: "60px", height: "60px" }} />
          </>
        }
      />
    </StyledGuestContainer>
  );
};

export default index;
