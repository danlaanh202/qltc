import Head from "next/head";
import styled from "styled-components";
import Layout from "../../components/layout/Layout";
import MainTop from "../../components/MainTop";
import PatientListTable from "../../components/table/PatientListTable";

const StyledListContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 60px auto 0;
`;
const list = () => {
  return (
    <Layout>
      <Head>
        <title>Danh sách thuốc tiêm</title>
      </Head>
      <StyledListContainer>
        <MainTop
          title="Danh sách thuốc tiêm"
          backTitle="Quản lý thuốc tiêm"
          backRoute="/medicine_management"
        />
        <PatientListTable />
      </StyledListContainer>
    </Layout>
  );
};

export default list;
