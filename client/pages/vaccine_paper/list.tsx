import Head from "next/head";
import styled from "styled-components";
import Layout from "../../components/layout/Layout";
import MainTop from "../../components/MainTop";
import PaperListTable from "../../components/table/PaperListTable";

const StyledListContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  max-width: 935px;
  margin: 60px auto 0;
`;
const list = () => {
  return (
    <Layout>
      <Head>
        <title>Danh sách phiếu tiêm</title>
      </Head>
      <StyledListContainer>
        <MainTop
          title="Danh sách phiếu tiêm"
          backTitle="Quản lý phiếu tiêm"
          backRoute="/vaccine_paper"
        />
        <PaperListTable />
      </StyledListContainer>
    </Layout>
  );
};

export default list;
