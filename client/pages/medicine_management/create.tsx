import Head from "next/head";
import Layout from "../../components/layout/Layout";
import styled from "styled-components";
import MainTop from "../../components/MainTop";

import CreateMedicineForm from "../../components/form/CreateMedicineForm";

const StyledCreateContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  max-width: 935px;
  margin: 60px auto 0;
`;
const create = () => {
  return (
    <Layout>
      <Head>
        <title>Tạo thuốc tiêm</title>
      </Head>
      <StyledCreateContainer>
        <MainTop
          title="Tạo thuốc tiêm"
          backTitle="Quản lý thuốc tiêm"
          backRoute="/medicine_management"
        />
        <CreateMedicineForm />
      </StyledCreateContainer>
    </Layout>
  );
};

export default create;
