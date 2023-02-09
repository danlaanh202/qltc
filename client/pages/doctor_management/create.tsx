import Head from "next/head";
import Layout from "../../components/layout/Layout";
import styled from "styled-components";
import MainTop from "../../components/MainTop";
import CreateDoctorForm from "../../components/form/CreateDoctorForm";

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
        <title>Thêm bác sĩ</title>
      </Head>
      <StyledCreateContainer>
        <MainTop
          title="Thêm bác sĩ"
          backTitle="Quản lý bác sĩ"
          backRoute="/doctor_management"
        />
        <CreateDoctorForm />
      </StyledCreateContainer>
    </Layout>
  );
};

export default create;
