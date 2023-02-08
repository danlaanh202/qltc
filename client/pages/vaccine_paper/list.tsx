import Head from "next/head";
import styled from "styled-components";
import Layout from "../../components/layout/Layout";
import MainTop from "../../components/MainTop";
import MedicineEditTable from "../../components/table/MedicineEditTable";

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
        <title>Danh sách thuốc tiêm</title>
      </Head>
      <StyledListContainer>
        <MainTop
          title="Danh sách thuốc tiêm"
          backTitle="Quản lý thuốc tiêm"
          backRoute="/medicine_management"
        />
        <MedicineEditTable />
      </StyledListContainer>
    </Layout>
  );
};

export default list;
