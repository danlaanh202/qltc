import Head from "next/head";
import styled from "styled-components";
import Layout from "../../components/layout/Layout";
import MainTop from "../../components/MainTop";
import DoctorListTable from "../../components/table/DoctorListTable";

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
        <title>Danh sách bác sĩ</title>
      </Head>
      <StyledListContainer>
        <MainTop
          title="Danh sách bác sĩ"
          backTitle="Quản lý bác sĩ"
          backRoute="/doctor_management"
        />
        <DoctorListTable />
      </StyledListContainer>
    </Layout>
  );
};

export default list;
