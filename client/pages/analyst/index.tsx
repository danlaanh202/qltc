import Head from "next/head";
import styled from "styled-components";
import ChoosenBox from "../../components/box/ChoosenBox";
import Layout from "../../components/layout/Layout";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
`;
const index = () => {
  return (
    <Layout>
      <Head>
        <title>Thống kê</title>
      </Head>
      <StyledContainer>
        <ChoosenBox
          title="Thống kê số mũi đã tiêm"
          icon={
            <>
              <AnalyticsIcon />
            </>
          }
          href="/analyst/so_mui_da_tiem"
        />
        <ChoosenBox
          title="Thống kê số mũi còn thiếu"
          icon={
            <>
              <AnalyticsIcon />
            </>
          }
          href="/analyst/so_mui_con_thieu"
        />
        <ChoosenBox
          title="Thống kê ngày tiêm kế tiếp"
          icon={
            <>
              <AnalyticsIcon />
            </>
          }
          href="/analyst/ngay_tiem_ke_tiep"
        />
      </StyledContainer>
    </Layout>
  );
};

export default index;
