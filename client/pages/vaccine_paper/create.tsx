import Head from "next/head";
import Layout from "../../components/layout/Layout";
import styled from "styled-components";
import MainTop from "../../components/MainTop";
// import FormRow from "../../components/form/FormRow";
// import FormInput from "../../components/form/FormInput";
// import CreateMedicineForm from "../../components/form/CreateMedicineForm";
import CreatePatientForm from "../../components/form/CreatePatientForm";
import CreatePaperForm from "../../components/form/CreatePaperForm";

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
        <title>Thêm phiếu tiêm</title>
      </Head>
      <StyledCreateContainer>
        <MainTop
          title="Thêm phiếu tiêm"
          backTitle="Quản lý phiếu tiêm"
          backRoute="/vaccine_paper"
        />
        <CreatePaperForm />
      </StyledCreateContainer>
    </Layout>
  );
};

export default create;
